function doPost(e) {
  try {
    // Log the incoming data for debugging
    Logger.log("Received data: " + JSON.stringify(e.parameter));
    
    // Get the spreadsheet
    const spreadsheetId = "1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E";
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get form data from direct submission
    const data = e.parameter;
    
    // Create headers if they don't exist
    if (sheet.getRange("A1").getValue() === "") {
      sheet.appendRow(["تاريخ الطلب", "الاسم الكامل", "رقم الهاتف", "المدينة", "المنتج", "الكمية"]);
    }
    
    // Append data
    sheet.appendRow([
      data.date || new Date().toLocaleString(),
      data.name || "",
      data.phone || "",
      data.city || "",
      data.product || "عسل الفرنان",
      data.quantity || ""
    ]);
    
    // Return HTML response for iframe
    return HtmlService.createHtmlOutput(
      '<html><body><h1>تم استلام طلبك بنجاح!</h1><script>window.top.location.href = window.top.location.href;</script></body></html>'
    );
      
  } catch (error) {
    // Log any errors
    Logger.log("Error: " + error.toString());
    
    return HtmlService.createHtmlOutput(
      '<html><body><h1>حدث خطأ في معالجة طلبك.</h1><p>' + error.toString() + '</p></body></html>'
    );
  }
}

function doGet() {
  return HtmlService.createHtmlOutput(
    '<html><body><h1>خدمة استقبال طلبات عسل الفرنان تعمل بشكل صحيح.</h1></body></html>'
  );
}
