// Google Apps Script code - Save this in a new Google Apps Script project

// This function is called when the web app receives a POST request
function doPost(e) {
  try {
    // Get the spreadsheet where data will be stored
    const spreadsheetId = "15i2wHM5Cb9x68PHiwZDtKzfZZfrtU8Z_XmRGZAhwmgE"; // Your Google Sheet ID
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
SETUP INSTRUCTIONS:

1. Create a new Google Sheet
   - Copy the Spreadsheet ID from the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   - Create a sheet named "طلبات" or use the default sheet

2. Create a new Google Apps Script project
   - Go to https://script.google.com/
   - Create a new project
   - Copy and paste this code
   - Replace YOUR_SPREADSHEET_ID_HERE with your actual spreadsheet ID

3. Deploy as a web app
   - Click Deploy > New deployment
   - Select "Web app" as the type
   - Set who has access (Execute as: Me, Who has access: Anyone)
   - Click Deploy
   - Copy the Web app URL

4. Update your JavaScript file
   - Replace the GOOGLE_SHEET_WEB_APP_URL in google_sheets_script.js with your Web app URL

5. Test the integration
   - Submit a test order on your website
   - Check your Google Sheet to verify the data was received
*/
