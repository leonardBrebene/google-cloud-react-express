import express, { json } from 'express';
import cors from 'cors'
import { format } from 'date-fns';
import addRowToGoogleSheets from './google-sheets-steps/addRowsToGoogleSheets.js';



const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('simple-react-app/build'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.post('/web-scraping-parameters', async (req, res) => {
  try {
    const incomingData = req.body; // Get data from the request body
    console.log("request body: " + JSON.stringify(incomingData))

    const dateNow = format(new Date(), 'dd-MM-yyyy HH:mm')
    const values = ["", dateNow, incomingData.email, 'Value4']
    addRowToGoogleSheets(values);

    res.status(200).send("Received 200" + JSON.stringify(incomingData));

  } catch (error) {
    res.status(500).send({ error: 'An error occurred while saving data.' + error });
  }
});

app.get('/pirates', async (req, res) => {
  const ceva = await getSheetData()
  res.send({ data: ceva });
})





async function getSheetData() {
  const spreadsheetId = '1pFKwUY1ROVgg3B59Xm80AZ9W-Qd7nqamMuB1OBStIno';
  const sheetName = '744616532';  // Replace with your actual sheet name
  // Construct the URL for fetching CSV
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    return data  // Assuming displayData is defined elsewhere to handle the output
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('sheet-data').innerText = 'Error fetching data.';
  }
}