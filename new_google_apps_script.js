// Google Apps Script code - For your new spreadsheet
// Copy and paste this code into your Google Apps Script editor

function doPost(e) {
  try {
    // Get the spreadsheet where data will be stored
    const spreadsheetId = "1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E"; // Your new Google Sheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName("طلبات") || spreadsheet.getSheets()[0];
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Check if headers exist, if not add them
    if (sheet.getRange("A1").getValue() === "") {
      sheet.appendRow(["تاريخ الطلب", "الاسم الكامل", "رقم الهاتف", "المدينة", "المنتج", "الكمية", "العنوان", "ملاحظات"]);
    }
    
    // Append the new order data as a row
    sheet.appendRow([
      data.date,
      data.name,
      data.phone,
      data.city,
      data.product || '',
      data.quantity,
      data.address || '',
      data.notes || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log any errors and return error response
    console.error("Error processing request: " + error);
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function handles GET requests (for testing)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "online" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* 
DEPLOYMENT INSTRUCTIONS:

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E/edit
2. Click on Extensions > Apps Script
3. Delete any existing code and paste this entire script
4. Click on Deploy > New deployment
5. Select "Web app" as the deployment type
6. Description: "Farnaan Honey Order Form Handler"
7. Execute as: "Me"
8. Who has access: "Anyone"
9. Click "Deploy"
10. Copy the Web App URL that appears after deployment
11. The Web App URL has already been updated in your google_sheets_script.js file

Note: If you need to update the deployment later, use Deploy > Manage deployments 
*/
