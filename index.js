const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = './test.pdf';
const outputPath = './output.txt';

const readPDF = async (pdfPath, outputPath) => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    // Access the text content of the PDF
    const text = data.text;

    // Write the text to a new file
    fs.writeFileSync(outputPath, text);

    console.log(`Text extracted and saved to: ${outputPath}`);
  } catch (error) {
    console.error('Error reading or writing PDF:', error);
  }
};

readPDF(pdfPath, outputPath);
