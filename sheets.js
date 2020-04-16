require('dotenv/config');
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function add(worksheetId,row){
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[worksheetId];
    console.log(row);
    await sheet.addRow(row);
}

exports.add = add;