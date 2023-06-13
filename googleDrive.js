const { google } = require('googleapis');

// Load credentials from environment variables or a configuration file
const credentials = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: [process.env.REDIRECT_URI],
};

// Create an OAuth2 client with the credentials
const oAuth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

// Function to authenticate and retrieve an access token
async function authorize() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  console.log('Authorize this app by visiting this URL:', authUrl);

  // Prompt the user to enter the authorization code
  const authCode = 'AIzaSyCw2lf0Vlu9iyE61bf6QuOvjSCwK8s2okw';

  // Exchange the authorization code for an access token
  const token = await oAuth2Client.getToken(authCode);
  oAuth2Client.setCredentials(token);

  return oAuth2Client;
}

// Function to list files in Google Drive
async function listFiles() {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });

  try {
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'files(name, id)',
    });

    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.forEach((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  } catch (err) {
    console.error('The API returned an error:', err.message);
  }
}

module.exports = { authorize, listFiles };