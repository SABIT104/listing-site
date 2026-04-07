const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.html')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles('.');

files.forEach(file => {
  try {
    // 1. Read the file as raw bytes
    const buffer = fs.readFileSync(file);
    
    // 2. The corruption happened by reading UTF-8 as Latin1(ANSI) and writing as UTF-8.
    // To reverse: We take the current UTF-8 string, encode it back to bytes using UTF-8, 
    // then interpret those bytes as Latin1 to get the 'original' bytes, 
    // then interpret THOSE bytes as UTF-8. 
    // Actually, simpler: The file is currently UTF-8 containing the Mojibake.
    const mojibake = fs.readFileSync(file, 'utf8');
    
    // Convert the string back to the bytes that PowerShell incorrectly decoded
    const bytes = Buffer.from(mojibake, 'binary'); 
    
    // Now interpret those bytes as UTF-8
    const corrected = bytes.toString('utf8');
    
    // Save it back cleanly
    fs.writeFileSync(file, corrected, 'utf8');
    console.log(`Fixed: ${file}`);
  } catch (err) {
    console.error(`Failed: ${file}`, err.message);
  }
});
