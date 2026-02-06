import { NextRequest, NextResponse } from 'next/server';
import { GrantApplication } from '@/types';

const SHEET_ID = '1esaDQaoVY8vTd0gd5LxA4KCWk0oMXVEPCY-pQ3aS-Xg';

// Column mapping (0-indexed)
const COLUMNS = {
  timestamp: 0,
  name: 1,
  title: 2,
  address: 3,
  email: 4,
  phone: 5,
  socialMedia: 6,
  applicantType: 7,
  organizationDetails: 8,
  nonprofitStatus: 9,
  purpose: 10,
  amountRequested: 11,
  budget: 12,
  peopleServed: 13,
  impact: 14,
  startDate: 15,
  eventType: 16,
  additionalInfo: 17,
  molly: 18,
  decision: 19,
  approvedAmount: 20,
  why: 21,
};

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i++) {
    const char = csv[i];
    const nextChar = csv[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentCell.trim());
        if (currentRow.length > 1 || currentRow[0] !== '') {
          rows.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
        if (char === '\r') i++;
      } else {
        currentCell += char;
      }
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

function parseAmount(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[$,]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function rowToApplication(row: string[], rowIndex: number): GrantApplication {
  return {
    rowIndex,
    timestamp: row[COLUMNS.timestamp] || '',
    name: row[COLUMNS.name] || '',
    title: row[COLUMNS.title] || '',
    address: row[COLUMNS.address] || '',
    email: row[COLUMNS.email] || '',
    phone: row[COLUMNS.phone] || '',
    socialMedia: row[COLUMNS.socialMedia] || '',
    applicantType: row[COLUMNS.applicantType] || '',
    organizationDetails: row[COLUMNS.organizationDetails] || '',
    nonprofitStatus: row[COLUMNS.nonprofitStatus] || '',
    purpose: row[COLUMNS.purpose] || '',
    amountRequested: parseAmount(row[COLUMNS.amountRequested]),
    budget: row[COLUMNS.budget] || '',
    peopleServed: row[COLUMNS.peopleServed] || '',
    impact: row[COLUMNS.impact] || '',
    startDate: row[COLUMNS.startDate] || '',
    eventType: row[COLUMNS.eventType] || '',
    additionalInfo: row[COLUMNS.additionalInfo] || '',
    molly: row[COLUMNS.molly] || '',
    decision: row[COLUMNS.decision] || '',
    approvedAmount: row[COLUMNS.approvedAmount] || '',
    why: row[COLUMNS.why] || '',
  };
}

export async function GET() {
  try {
    // Use gviz endpoint which works with "anyone with link can edit" sheets
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    const response = await fetch(csvUrl, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }

    const csv = await response.text();
    const rows = parseCSV(csv);

    // Skip header row, map to applications
    const applications = rows.slice(1).map((row, index) => rowToApplication(row, index + 2)); // +2 for 1-indexed and header

    return NextResponse.json({
      applications,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { rowIndex, decision, approvedAmount, why } = await request.json();

    if (!rowIndex) {
      return NextResponse.json(
        { error: 'Row index is required' },
        { status: 400 }
      );
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      // Fallback: Return edit URL for manual editing
      const editUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=0&range=T${rowIndex}:V${rowIndex}`;
      return NextResponse.json({
        success: false,
        needsSetup: true,
        message: 'Google Apps Script not configured. See google-apps-script.js for setup instructions.',
        editUrl,
      });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rowIndex, decision, approvedAmount, why }),
      redirect: 'follow',
    });

    // Google Apps Script returns 302 redirect, then the actual response
    // We need to handle both HTML redirect and JSON response
    const text = await response.text();

    let result;
    if (text.includes('<HTML>') || text.includes('Moved Temporarily')) {
      // Extract redirect URL and follow it manually for POST
      const match = text.match(/HREF="([^"]+)"/);
      if (match) {
        const redirectUrl = match[1].replace(/&amp;/g, '&');
        const redirectResponse = await fetch(redirectUrl);
        result = await redirectResponse.json();
      } else {
        throw new Error('Could not parse redirect');
      }
    } else {
      result = JSON.parse(text);
    }

    if (!result.success) {
      throw new Error(result.error || 'Unknown error');
    }

    return NextResponse.json({
      success: true,
      message: 'Decision saved successfully',
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}
