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
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'RSVP submitted successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Wedding RSVP API is running'
  }))
  .setMimeType(ContentService.MimeType.JSON);
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
   - **Who has access**: Anyone ⚠️ **THIS IS CRITICAL!**
5. Click **Deploy**
6. **IMPORTANT**: You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" if you see a warning
   - Click "Go to Wedding RSVP Handler (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/AKfycby...`)
8. Click **Done**
AKfycby12UxAP2gO_A1YxRiVMlzbvqt5vLI4SwOGIl3ER6tHDWw5i-j6xNmZmvJPuqe5dZCW
https://script.google.com/macros/s/AKfycby12UxAP2gO_A1YxRiVMlzbvqt5vLI4SwOGIl3ER6tHDWw5i-j6xNmZmvJPuqe5dZCW/exec
## Step 4: Update Your Website

1. Open `src/components/RSVP.jsx`
2. Find this line (around line 62):
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_SCRIPT_URL_HERE"` with your Web App URL from Step 3
   
   **Example:**
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";
   ```
   
   ⚠️ **Make sure the URL ends with `/exec`**

4. Save the file

## Step 5: Test the Integration

1. Run your website: `npm run dev`
2. Open the browser console (F12) to see debug messages
3. Fill out the RSVP form and submit
4. Check the console for success messages:
   - ✅ "RSVP submitted successfully!" = Working!
   - ⚠️ "Google Sheets URL not configured" = URL not updated
   - ❌ Error message = See troubleshooting below
5. Check your Google Sheet - you should see a new row with the submission!

## Troubleshooting

### Error 400: Bad Request

This error occurs when:

1. **URL not configured**: The placeholder `"YOUR_GOOGLE_SCRIPT_URL_HERE"` is still in the code
   - **Fix**: Replace with your actual Web App URL from Step 3

2. **Wrong URL format**: Missing `/exec` at the end
   - **Fix**: Ensure URL ends with `/exec`
   - **Correct**: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Wrong**: `https://script.google.com/macros/s/AKfycby...`

3. **Access permissions**: "Who has access" is not set to "Anyone"
   - **Fix**: Redeploy with "Anyone" access (Step 3)

4. **Old deployment**: Using an old deployment URL
   - **Fix**: Create a NEW deployment and use the new URL

### If submissions aren't appearing:

1. **Check the browser console** (F12) for error messages
2. **Verify the URL**: Make sure you copied the entire Web App URL including `/exec`
3. **Redeploy**: Try creating a new deployment in Apps Script
4. **Permissions**: Ensure "Who has access" is set to "Anyone"
5. **Test the script**: In Apps Script, click "Run" > "doPost" to test

### CORS Errors:

The code has been updated to remove `mode: "no-cors"` which was causing issues. If you still see CORS errors:

1. Make sure "Who has access" is set to "Anyone" in deployment settings
2. Create a NEW deployment (don't reuse old ones)
3. The script must be deployed as a Web App, not as an API

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

- The form now provides better error messages in the console
- Data is always saved to localStorage as a backup
- Responses are timestamped automatically
- The sheet will update in real-time as people submit RSVPs
- Check the browser console (F12) for detailed debug information

## Quick Checklist

- [ ] Created Google Sheet with correct headers
- [ ] Created Apps Script with the code above
- [ ] Deployed as Web App with "Anyone" access
- [ ] Authorized the script (if prompted)
- [ ] Copied the Web App URL (ends with `/exec`)
- [ ] Updated `RSVP.jsx` with the actual URL
- [ ] Tested the form and checked the console
- [ ] Verified data appears in Google Sheet
