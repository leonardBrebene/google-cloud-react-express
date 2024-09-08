import {google} from "googleapis"; 
import getGoogleSheetsLogins from "../google-sheets-logins/getGoogleSheetsLogins.js";


const SPREADSHEET_ID = '1OCL2lbh1X0LmJ-CRNXdWMa64Cbi4kG3lFVFKIteKRc0';
const SHEET_NAME = 'HistoricalData'; // Replace with the name of your sheet


const addRowToGoogleSheets = async (values) => {
  getGoogleSheetsLogins()
  const auth = new google.auth.GoogleAuth(
    getGoogleSheetsLogins()

  );

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth });

  const sheetsClient = await sheets.spreadsheets.values.append({
    auth: authClient,
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:Z`, // Choose the range where the new row will be added
    valueInputOption: 'RAW',
    resource: {
      values: [values], // An array of values for each column in the new row
    },
  });
    
  console.log('Row added successfully:', sheetsClient.data);
}



export default addRowToGoogleSheets;

// const values =  ['value2, Value3', 'Value4']
// //Replace with your data
// addRowToGoogleSheets(values);