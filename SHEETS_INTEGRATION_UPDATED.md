# Google Sheets Integration Updated

I've updated your Google Sheets integration to use your new spreadsheet:
`https://docs.google.com/spreadsheets/d/1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E/edit`

## Changes Made:

1. **Updated JavaScript File**:
   - Changed the Google Apps Script Web App URL in `google_sheets_script.js` to:
   ```javascript
   const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbySGBBmkjhrvBGp1zOEhI1y1E6y7jR_c-Uph54V4KgCEkXpNqYo23h1ItvI_KR-KNT2Uw/exec";
   ```

2. **Created New Google Apps Script**:
   - Created a new script file `new_google_apps_script.js` that you should copy into your Google Apps Script editor
   - This script is configured to use your new spreadsheet ID

## Next Steps:

1. **Set Up the Google Apps Script**:
   - Go to your new Google Sheet: https://docs.google.com/spreadsheets/d/1qBi_XX-WKvuXrO04-xOO9oIiMW0A99_1nVs2N330f1E/edit
   - Click on Extensions > Apps Script
   - Delete any existing code in the editor
   - Copy and paste the entire content from `new_google_apps_script.js`
   - Save the project

2. **Deploy the Script**:
   - Click on Deploy > New deployment
   - Select "Web app" as the deployment type
   - Configure:
     - Description: "Farnaan Honey Order Form Handler"
     - Execute as: "Me"
     - Who has access: "Anyone"
   - Click "Deploy"
   - Authorize the app when prompted
   - The Web App URL should match what's already in your JavaScript file

3. **Test the Integration**:
   - Open your landing page
   - Fill out and submit the order form
   - Check your new Google Sheet to see if the data appears

Your form submissions should now be stored in your new Google Sheet!
