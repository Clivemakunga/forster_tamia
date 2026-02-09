# Google Sheets RSVP Integration Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVP Responses"
4. Add the following headers in row 1:
   - Column A: **Full Name**
   - Column B: **Phone**
   - Column C: **Timestamp**

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Append the data to the sheet
    sheet.appendRow([
      data.fullName,
      data.phone,
      data.timestamp
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'RSVP submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name your project "Wedding RSVP Handler"

## Step 3: Deploy the Web App

1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: Wedding RSVP Form
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...`)
7. Click **Done**

## Step 4: Update Your Website

1. Open `src/components/RSVP.jsx`
2. Find this line (around line 65):
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_SCRIPT_URL_HERE"` with your Web App URL from Step 3
4. Save the file

## Step 5: Test the Integration

1. Run your website: `npm run dev`
2. Fill out the RSVP form and submit
3. Check your Google Sheet - you should see a new row with the submission!

## Troubleshooting

### If submissions aren't appearing:

1. **Check the URL**: Make sure you copied the entire Web App URL
2. **Redeploy**: Try creating a new deployment in Apps Script
3. **Permissions**: Ensure "Who has access" is set to "Anyone"
4. **Browser Console**: Check for errors in the browser's developer console

### Alternative: Email Notifications

If you also want email notifications, add this to your Apps Script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Append to sheet
    sheet.appendRow([data.fullName, data.phone, data.timestamp]);
    
    // Send email notification
    MailApp.sendEmail({
      to: "your-email@example.com",
      subject: "New Wedding RSVP",
      body: `New RSVP received:\n\nName: ${data.fullName}\nPhone: ${data.phone}\nTime: ${data.timestamp}`
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Replace `"your-email@example.com"` with your actual email address.

## Notes

- The form uses `mode: "no-cors"` which means you won't get detailed error messages in the browser
- Data is still saved to localStorage as a backup
- Responses are timestamped automatically
- The sheet will update in real-time as people submit RSVPs
