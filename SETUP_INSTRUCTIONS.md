# Integration with Google Sheets - Setup Instructions

This document explains how to set up your landing page to automatically collect client information in an online Google Sheets spreadsheet.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name the spreadsheet "عسل الفرنان - طلبات العملاء" or any name you prefer
3. Rename the first sheet to "طلبات" (or leave it as is)
4. Copy the Spreadsheet ID from the URL:
   - The URL will look like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - The SPREADSHEET_ID is the long string of characters in the middle of the URL

## Step 2: Create a Google Apps Script

1. Go to [Google Apps Script](https://script.google.com) and create a new project
2. Name the project "عسل الفرنان - نظام الطلبات"
3. Delete any default code in the editor
4. Copy and paste the code from the `google_apps_script.js` file
5. Replace `YOUR_SPREADSHEET_ID_HERE` with the Spreadsheet ID you copied in Step 1
6. Save the project (Ctrl+S or File > Save)

## Step 3: Deploy the Web App

1. Click on "Deploy" > "New deployment"
2. Select "Web app" as the deployment type
3. Configure the deployment:
   - Description: "نظام طلبات عسل الفرنان"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone" (This allows the form to send data without requiring users to sign in)
4. Click "Deploy"
5. Authorize the app when prompted (click "Allow")
6. Copy the Web App URL that appears after deployment

## Step 4: Update Your Landing Page Code

1. Open the file `google_sheets_script.js`
2. Replace the value of `GOOGLE_SHEET_WEB_APP_URL` at the top of the file with the Web App URL you copied in Step 3
3. Save the file

## Step 5: Test the Integration

1. Open your landing page
2. Fill out the order form with test data
3. Submit the form
4. Check your Google Sheet to verify the data was received

## Troubleshooting

If you encounter any issues:

1. Check the browser console for errors (F12 > Console)
2. Verify that the Google Sheet and Google Apps Script are correctly set up
3. Make sure the Web App URL is correctly copied into your code
4. Check that the Google Apps Script is deployed and accessible

## Notes

- Your Google Sheet will automatically update whenever a client submits the order form
- You can access your Google Sheet from any device by going to [Google Sheets](https://sheets.google.com)
- The data is also saved locally in the browser as a backup in case of connection issues
