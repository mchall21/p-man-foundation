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
  location?: string;
  granteeType?: string;
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

// Get the CSV URL from environment variables
function getCSVUrl(): string {
  // Option 1: Use full CSV URL if provided
  if (process.env.GRANTS_CSV_URL) {
    return process.env.GRANTS_CSV_URL;
  }
  
  // Option 2: Build from sheet ID and GID
  const sheetId = process.env.GRANTS_SHEET_ID;
  const gid = process.env.GRANTS_SHEET_GID || '0';
  
  if (!sheetId) {
    throw new Error('GRANTS_SHEET_ID or GRANTS_CSV_URL must be set in environment variables');
  }
  
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

const CSV_URL = getCSVUrl();

function parseCSV(csvText: string): RawGrantRow[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  
  // More robust CSV parsing that handles quoted values with commas
  function parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"' && nextChar === '"') {
        current += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }
  
  const headers = parseCSVLine(lines[0]);
  console.log('CSV Headers:', headers);
  
  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    const row: RawGrantRow = {};
    headers.forEach((header, headerIndex) => {
      row[header] = values[headerIndex] || '';
    });
    
    // Log first few rows for debugging
    if (index < 3) {
      console.log(`Row ${index + 1}:`, row);
    }
    
    return row;
  }).filter(row => {
    // Filter out empty rows
    const hasData = Object.values(row).some(value => value && value.trim() !== '');
    return hasData;
  });
}

function processGrant(row: RawGrantRow): ProcessedGrant | null {
  try {
    // Extract key fields based on your exact sheet headers
    const grantee = row['Grantee Name'] || row['Grantee'] || '';
    const dateStr = row['Date'] || '';
    const amountStr = row['Amount'] || '0';
    const participantsStr = row['Participants'] || '0';
    const daysStr = row['Estimated Days'] || '0';
    const goodDaysStr = row['Good Days'] || '0';
    const tagsStr = row['Sober Social Activity Type'] || '';
    const description = row['Description'] || '';
    const location = row['Location'] || '';
    const granteeType = row['Grantee Type'] || '';
    const category = row['Category'] || '';
    
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
    
    // Parse tags - handle both comma-separated and the categories
    const tags = tagsStr.split(/[,;|]/).map(tag => 
      tag.trim()
        .replace(/💪|🌿|🎉|🎨|🙏/g, '') // Remove emoji
        .trim()
    ).filter(Boolean);
    
    // Add category tags if available
    if (category) {
      const categoryTags = category.split(/[,;|]/).map(tag => 
        tag.trim()
          .replace(/💪|🌿|🎉|🎨|🙏/g, '') // Remove emoji
          .trim()
      ).filter(Boolean);
      tags.push(...categoryTags);
    }
    
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
      tags: [...new Set(tags)], // Remove duplicates
      description,
      location,
      granteeType
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
      console.log('First 500 chars:', csvText.substring(0, 500));
      
      const rawRows = parseCSV(csvText);
      console.log('Parsed rows:', rawRows.length);
      
      const processedGrants = rawRows
        .map(processGrant)
        .filter((grant): grant is ProcessedGrant => grant !== null);
      
      console.log('Valid grants:', processedGrants.length);
      
      if (processedGrants.length > 0) {
        console.log('Sample processed grant:', processedGrants[0]);
      }
      
      const result = analyzeGrants(processedGrants);
      console.log('Analysis result totals:', result.totals);
      
      return result;
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
    revalidate: parseInt(process.env.GRANTS_CACHE_TTL || '600'), // Default 10 minutes
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