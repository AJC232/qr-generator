const fs = require('fs');
const express = require('express');
const QRCode = require('qrcode');

const app = express();

// Route for generating the QR code for the PDF file download
app.get('/qr-code', async (req, res) => {
  try {
    // Generate QR code for the PDF file download endpoint
    const qrCodeData = await QRCode.toDataURL('http://localhost:3000/download');

    // Send the QR code image as a response
    res.send(`<img src="${qrCodeData}">`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route for downloading the PDF file
app.get('/download', async (req, res) => {
  try {
    // Download the PDF file from the server
    const file = fs.createReadStream('./Poster.pdf');
    res.setHeader('Content-disposition', 'attachment; filename=poster.pdf');
    res.setHeader('Content-type', 'application/pdf');
    file.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
