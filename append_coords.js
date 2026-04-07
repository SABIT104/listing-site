const fs = require('fs');
const path = require('path');

const dataFile = path.join(process.cwd(), 'js', 'data.js');
let code = fs.readFileSync(dataFile, 'utf-8');

// Match every object inside the LISTINGS array
// We will simply use regex to inject lat and lng before the closing bracket of each object

const centers = {
  "ঢাকা": { lat: 23.75, lng: 90.38 },
  "চট্টগ্রাম": { lat: 22.35, lng: 91.78 },
  "রাজশাহী": { lat: 24.37, lng: 88.60 },
  "খুলনা": { lat: 22.84, lng: 89.54 },
  "বরিশাল": { lat: 22.70, lng: 90.35 },
  "সিলেট": { lat: 24.89, lng: 91.86 },
  "রংপুর": { lat: 25.74, lng: 89.27 },
  "ময়মনসিংহ": { lat: 24.74, lng: 90.42 }
};

// A helper to generate a slight offset
function offset() {
  return (Math.random() - 0.5) * 0.08; 
}

const lines = code.split('\n');
let currentDiv = "ঢাকা";

for (let i = 0; i < lines.length; i++) {
  // Try to track the division of the current item being parsed
  if (lines[i].includes('div: "')) {
    const match = lines[i].match(/div:\s*"([^"]+)"/);
    if (match) currentDiv = match[1];
  }
  
  // If line has 'tags:', inject lat/lng immediately after it
  if (lines[i].includes('tags: [')) {
    // Only inject if it doesn't already have lat/lng
    if (!lines[i].includes('lat:')) {
      const base = centers[currentDiv] || centers["ঢাকা"];
      const lat = (base.lat + offset()).toFixed(4);
      const lng = (base.lng + offset()).toFixed(4);
      
      lines[i] = lines[i].replace(/(tags:\s*\[.*?\])(\s*\}?)/, `$1, lat: ${lat}, lng: ${lng}$2`);
    }
  }
}

fs.writeFileSync(dataFile, lines.join('\n'), 'utf-8');
console.log('Coordinates added successfully.');
