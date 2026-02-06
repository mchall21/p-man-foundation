// Google Apps Script - Deploy this as a Web App
// 1. Go to https://script.google.com
// 2. Create a new project
// 3. Paste this code
// 4. Deploy > New Deployment > Web App
// 5. Set "Who has access" to "Anyone"
// 6. Copy the web app URL and add it to .env.local as GOOGLE_SCRIPT_URL

const SHEET_ID = '1esaDQaoVY8vTd0gd5LxA4KCWk0oMXVEPCY-pQ3aS-Xg';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { rowIndex, decision, approvedAmount, why } = data;

    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Columns T, U, V are 20, 21, 22 (1-indexed)
    if (decision !== undefined) sheet.getRange(rowIndex, 20).setValue(decision);
    if (approvedAmount !== undefined) sheet.getRange(rowIndex, 21).setValue(approvedAmount);
    if (why !== undefined) sheet.getRange(rowIndex, 22).setValue(why);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Grant Review API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
