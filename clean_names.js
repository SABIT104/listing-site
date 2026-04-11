const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
if (Array.isArray(db.listings)) {
  db.listings.forEach(item => {
    if (typeof item.name === 'string') {
      item.name = item.name.replace(/\d+/g, '').trim();
    }
  });
}
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Names cleaned');
