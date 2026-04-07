const fs = require('fs');
const path = require('path');

/**
 * Recursively find all HTML files in a directory.
 */
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getHtmlFiles(name, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(name);
    }
  });
  return fileList;
}

const rootDir = path.join(__dirname, '..');
const htmlFiles = getHtmlFiles(rootDir).filter(f => !f.endsWith('index.html'));

const marqueeRegex = /<!-- PART 3\.5: MARQUEE AD -->\s*<div class="marquee-container">[\s\S]*?<\/div>\s*<\/div>/g;

console.log(`Checking ${htmlFiles.length} files...`);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (marqueeRegex.test(content)) {
    const newContent = content.replace(marqueeRegex, '');
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`✅ Removed from: ${path.relative(rootDir, file)}`);
  } else {
    // console.log(`⏭️  No marquee found in: ${path.relative(rootDir, file)}`);
  }
});

console.log('Cleanup complete.');
