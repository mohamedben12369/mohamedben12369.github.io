// Google Apps Script code - For your new spreadsheet
// Copy and paste this code into your Google Apps Script editor

function doPost(e) {
  try {
    // Log the incoming data for debugging
    Logger.log("Received data: " + JSON.stringify(e.parameter));
    
    // Get the spreadsheet
    const spreadsheetId = "1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E"; // Your new Google Sheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName("طلبات") || spreadsheet.getSheets()[0];
    
    // Check for form-encoded or JSON data
    let data;
    if (e.postData && e.postData.contents) {
      // Try to parse as JSON
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log("Parsed JSON data: " + JSON.stringify(data));
      } catch (err) {
        // If not JSON, use form parameters
        data = e.parameter;
        Logger.log("Using form parameters: " + JSON.stringify(data));
      }
    } else {
      // Fallback to URL parameters
      data = e.parameter;
      Logger.log("Using URL parameters: " + JSON.stringify(data));
    }
    
    // Create headers if they don't exist
    if (sheet.getRange("A1").getValue() === "") {
      sheet.appendRow(["تاريخ الطلب", "الاسم الكامل", "رقم الهاتف", "المدينة", "المنتج", "الكمية", "العنوان", "ملاحظات"]);
    }
    
    // Append data
    sheet.appendRow([
      data.date || new Date().toLocaleString(),
      data.name || "",
      data.phone || "",
      data.city || "",
      data.product || "عسل الفرنان",
      data.quantity || "",
      data.address || "",
      data.notes || ""
    ]);
    
    Logger.log("Data successfully added to sheet");
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log any errors
    Logger.log("Error: " + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// This function handles GET requests (for testing)
function doGet() {
  return ContentService
    .createTextOutput("The Google Sheets web app is running correctly.")
    .setMimeType(ContentService.MimeType.TEXT);
}

/* 
DEPLOYMENT INSTRUCTIONS:

1. Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E/edit
2. Click on Extensions > Apps Script
3. Delete any existing code and paste this entire script
4. Save the project (File > Save)
5. Click on Deploy > New deployment
6. Select "Web app" as the deployment type
7. Description: "Farnaan Honey Order Form Handler"
8. Execute as: "Me"
9. Who has access: "Anyone"
10. Click "Deploy"
11. Authorize the app when prompted
12. Copy the Web App URL that appears after deployment
13. Use this URL in your google_sheets_script.js file
*/
