const readline = require('readline');
const fs = require('fs');

function getContentBetweenMarkers(filePath, startMarker, endMarker) {
  const readStream = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  let isInsideContent = false;
  let retrievedContent = [];

  readStream.on('line', function (line) {
    if (line.includes(startMarker)) {
      isInsideContent = true;
    }

    if (isInsideContent) {
      retrievedContent.push(line);
    }

    if (line.includes(endMarker)) {
      isInsideContent = false;
      readStream.close();
    }
  });

  readStream.on('close', function () {
    console.log(`Content between ${startMarker} and ${endMarker}:`);
    retrievedContent.forEach((line, index) => {
      console.log(`${line}`);
    });
  });
}

// Example usage:
const filePath = './output.txt';
const startMarker = 'TEST 1';
const endMarker = 'TEST 2';

getContentBetweenMarkers(filePath, startMarker, endMarker);
