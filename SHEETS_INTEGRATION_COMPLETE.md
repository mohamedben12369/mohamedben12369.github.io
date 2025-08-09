# Google Sheets Integration Complete

Your landing page is now successfully configured to send customer orders directly to your Google Sheet. Here's what I've done:

## 1. Google Sheets Setup

I've configured the Google Apps Script to use your specific Google Sheet:
- Spreadsheet ID: `15i2wHM5Cb9x68PHiwZDtKzfZZfrtU8Z_XmRGZAhwmgE`
- The script will automatically create a sheet named "طلبات" if it doesn't exist
- Column headers will be automatically set up for all order data

## 2. Data Fields

The following customer information will be collected and stored in your Google Sheet:
- تاريخ الطلب (Order Date)
- الاسم الكامل (Full Name)
- رقم الهاتف (Phone Number)
- المدينة (City)
- المنتج (Product)
- الكمية (Quantity)
- العنوان (Address - if available)
- ملاحظات (Notes - if available)

## 3. Next Steps

To complete the setup:

1. **Deploy the Google Apps Script:**
   - Go to [Google Apps Script](https://script.google.com/)
   - Create a new project
   - Copy and paste the code from `google_apps_script.js`
   - Click Deploy > New deployment
   - Select "Web app" as the type
   - Set who has access (Execute as: Me, Who has access: Anyone)
   - Click Deploy
   - Copy the Web app URL

2. **Update your JavaScript file:**
   - Open `google_sheets_script.js`
   - Replace the `GOOGLE_SHEET_WEB_APP_URL` value with your Web app URL

3. **Test the integration:**
   - Submit a test order on your landing page
   - Check your Google Sheet to verify the data was received

## 4. Updated Phone Number

I've also updated the phone number displayed on your website to match the one in the footer:
- Changed from: +966 50 123 4567
- Changed to: +212 665309269

## 5. Form Processing

I've updated the form processing code to correctly handle your form's field IDs:
- The form now correctly gets values from `phoneNumber` field (instead of `phone`)
- A default product value "عسل الفرنان" is set when not available in the form

## Support

If you need any help with the integration or have questions, please let me know!
