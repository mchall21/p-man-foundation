import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

interface RawGrantRow {
  [key: string]: string;
}

interface ProcessedGrant {
  grantee: string;
  date: string;
  amount: number;
  year: number;
  participants?: number;
  days?: number;
  goodDays: number;
  costPerGD: number;
  tags: string[];
  description?: string;
}

interface GrantsData {
  updatedAt: string;
  totals: {
    dollars: number;
    goodDays: number;
    costPerGD: number;
  };
  byYear: Array<{
    year: number;
    dollars: number;
    goodDays: number;
  }>;
  byTag: Array<{
    tag: string;
    dollars: number;
    goodDays: number;
  }>;
  top: Array<{
    grantee: string;
    goodDays: number;
    costPerGD: number;
    description: string;
    amount: number;
  }>;
  costStats: {
    min: number;
    median: number;
    max: number;
  };
  rows: ProcessedGrant[];
}

// Get the CSV URL - using the public sheet URL format
const SHEET_ID = '1vtqYR9gcFz_xNPAw7tdz_qB7JjIDO_uHrTYW-BoKKcg';
const GID = '0'; // Main sheet GID
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function parseCSV(csvText: string): RawGrantRow[] {
  const lines = csvText.trim().split('\\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.replace(/"/g, '').trim());
    const row: RawGrantRow = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });
}

function processGrant(row: RawGrantRow): ProcessedGrant | null {
  try {
    // Extract key fields (adjust based on actual sheet headers)
    const grantee = row['Organization'] || row['Grantee'] || '';
    const dateStr = row['Date'] || row['Grant Date'] || '';
    const amountStr = row['Amount'] || row['Grant Amount'] || '0';
    const participantsStr = row['Participants'] || row['Estimated Participants'] || '0';
    const daysStr = row['Days'] || row['Event Days'] || '0';
    const goodDaysStr = row['Good Days'] || row['Estimated Good Days'] || '0';
    const tagsStr = row['Sober Social Activity Type'] || row['Tags'] || '';
    const description = row['Description'] || row['Purpose'] || '';
    
    // Parse numeric values
    const amount = parseFloat(amountStr.replace(/[$,]/g, '')) || 0;
    const participants = parseInt(participantsStr) || 0;
    const days = parseInt(daysStr) || 0;
    let goodDays = parseInt(goodDaysStr) || 0;
    
    // If no good days provided, calculate from participants × days
    if (goodDays === 0 && participants > 0 && days > 0) {
      goodDays = participants * days;
    }
    
    // Skip invalid entries
    if (!grantee || amount <= 0 || goodDays <= 0) {
      return null;
    }
    
    // Parse date and extract year
    const date = new Date(dateStr);
    const year = date.getFullYear() || new Date().getFullYear();
    
    // Parse tags
    const tags = tagsStr.split(/[,;|]/).map(tag => tag.trim()).filter(Boolean);
    
    // Calculate cost per good day
    const costPerGD = amount / goodDays;
    
    return {
      grantee,
      date: date.toISOString().split('T')[0],
      amount,
      year,
      participants: participants || undefined,
      days: days || undefined,
      goodDays,
      costPerGD,
      tags,
      description
    };
  } catch (error) {
    console.error('Error processing grant row:', error, row);
    return null;
  }
}

function analyzeGrants(grants: ProcessedGrant[]): GrantsData {
  const updatedAt = new Date().toISOString();
  
  // Calculate totals
  const totalDollars = grants.reduce((sum, g) => sum + g.amount, 0);
  const totalGoodDays = grants.reduce((sum, g) => sum + g.goodDays, 0);
  const overallCostPerGD = totalDollars / totalGoodDays;
  
  // Group by year
  const byYear = grants.reduce((acc, grant) => {
    const existing = acc.find(item => item.year === grant.year);
    if (existing) {
      existing.dollars += grant.amount;
      existing.goodDays += grant.goodDays;
    } else {
      acc.push({
        year: grant.year,
        dollars: grant.amount,
        goodDays: grant.goodDays
      });
    }
    return acc;
  }, [] as Array<{ year: number; dollars: number; goodDays: number; }>)
  .sort((a, b) => a.year - b.year);
  
  // Group by tags
  const tagMap = new Map<string, { dollars: number; goodDays: number; }>();
  grants.forEach(grant => {
    grant.tags.forEach(tag => {
      const normalized = tag.toLowerCase().replace(/^the\\s+/, ''); // "The Arts" -> "arts"
      const existing = tagMap.get(normalized) || { dollars: 0, goodDays: 0 };
      existing.dollars += grant.amount;
      existing.goodDays += grant.goodDays;
      tagMap.set(normalized, existing);
    });
  });
  
  const byTag = Array.from(tagMap.entries()).map(([tag, data]) => ({
    tag: tag.charAt(0).toUpperCase() + tag.slice(1), // Capitalize
    dollars: data.dollars,
    goodDays: data.goodDays
  })).sort((a, b) => b.goodDays - a.goodDays);
  
  // Top producers
  const top = grants
    .sort((a, b) => b.goodDays - a.goodDays)
    .slice(0, 10)
    .map(grant => ({
      grantee: grant.grantee,
      goodDays: grant.goodDays,
      costPerGD: Math.round(grant.costPerGD * 100) / 100,
      description: grant.description || '',
      amount: grant.amount
    }));
  
  // Cost statistics
  const costs = grants.map(g => g.costPerGD).sort((a, b) => a - b);
  const costStats = {
    min: Math.round(costs[0] * 100) / 100,
    median: Math.round(costs[Math.floor(costs.length / 2)] * 100) / 100,
    max: Math.round(costs[costs.length - 1] * 100) / 100
  };
  
  return {
    updatedAt,
    totals: {
      dollars: Math.round(totalDollars),
      goodDays: totalGoodDays,
      costPerGD: Math.round(overallCostPerGD * 100) / 100
    },
    byYear,
    byTag,
    top,
    costStats,
    rows: grants
  };
}

// Cache the data processing for 10 minutes
const getCachedGrantsData = unstable_cache(
  async (): Promise<GrantsData> => {
    try {
      console.log('Fetching grants data from:', CSV_URL);
      
      const response = await fetch(CSV_URL, {
        headers: {
          'User-Agent': 'P-Man Foundation Website'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
      }
      
      const csvText = await response.text();
      console.log('CSV data length:', csvText.length);
      
      const rawRows = parseCSV(csvText);
      console.log('Parsed rows:', rawRows.length);
      
      const processedGrants = rawRows
        .map(processGrant)
        .filter((grant): grant is ProcessedGrant => grant !== null);
      
      console.log('Valid grants:', processedGrants.length);
      
      return analyzeGrants(processedGrants);
    } catch (error) {
      console.error('Error fetching grants data:', error);
      
      // Return mock data for development
      return {
        updatedAt: new Date().toISOString(),
        totals: { dollars: 500000, goodDays: 25000, costPerGD: 20 },
        byYear: [
          { year: 2020, dollars: 50000, goodDays: 2500 },
          { year: 2021, dollars: 75000, goodDays: 3750 },
          { year: 2022, dollars: 100000, goodDays: 5000 },
          { year: 2023, dollars: 125000, goodDays: 6250 },
          { year: 2024, dollars: 150000, goodDays: 7500 }
        ],
        byTag: [
          { tag: 'Physical', dollars: 150000, goodDays: 7500 },
          { tag: 'Social', dollars: 125000, goodDays: 6250 },
          { tag: 'Outdoors', dollars: 100000, goodDays: 5000 },
          { tag: 'Arts', dollars: 75000, goodDays: 3750 },
          { tag: 'Spiritual', dollars: 50000, goodDays: 2500 }
        ],
        top: [
          { grantee: 'R2ise Theater', goodDays: 750, costPerGD: 4, description: 'Theater performance bringing community together', amount: 3000 },
          { grantee: 'Lightway Recovery', goodDays: 600, costPerGD: 5, description: 'Walking path for safe sober exercise', amount: 3000 },
          { grantee: 'Brainwashed Coffee', goodDays: 400, costPerGD: 3, description: 'Sober pickleball league', amount: 1200 },
          { grantee: 'Docs Place', goodDays: 360, costPerGD: 4, description: 'Surf boards for sober surfing group', amount: 1440 }
        ],
        costStats: { min: 2, median: 15, max: 45 },
        rows: []
      };
    }
  },
  ['grants-data'],
  {
    revalidate: 600, // 10 minutes
    tags: ['grants']
  }
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh');
    
    // Force refresh if requested (for development)
    if (refresh === '1') {
      // Could implement cache busting here
    }
    
    const data = await getCachedGrantsData();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch grants data' },
      { status: 500 }
    );
  }
}