const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const v = new Date().getTime();

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace references to js/data.js to js/data.js?v=XXX
  content = content.replace(/src="js\/([^"]+?\.js)(?:\?v=\d+)?"/g, `src="js/$1?v=${v}"`);
  
  // Also for CSS
  content = content.replace(/href="css\/([^"]+?\.css)(?:\?v=\d+)?"/g, `href="css/$1?v=${v}"`);
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Cache busted all files.');
