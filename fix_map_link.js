const fs = require('fs');
const path = require('path');
const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  let mapLink = 'map.html';

  // Map the file name to specific category parameters for the Map link
  if (file === 'food.html') mapLink = 'map.html?cat=খাবার';
  else if (file === 'health.html') mapLink = 'map.html?cat=স্বাস্থ্য';
  else if (file === 'education.html') mapLink = 'map.html?cat=শিক্ষা';
  else if (file === 'accommodation.html') mapLink = 'map.html?cat=আবাসন';
  else if (file === 'company.html') mapLink = 'map.html?cat=কোম্পানি';
  else if (file === 'freelancing.html') mapLink = 'map.html?cat=ফ্রিল্যান্সিং';
  else if (file === 'it.html') mapLink = 'map.html?cat=আইটি';
  else if (file === 'small-business.html') mapLink = 'map.html?cat=ছোট ব্যবসা';
  else if (file === 'transport.html') mapLink = 'map.html?cat=পরিবহন';
  
  const pattern1 = '<a href="#">ম্যাপ</a>';
  const newLink1 = \`<a href="\${mapLink}">ম্যাপ</a>\`;

  if (content.includes(pattern1)) {
    content = content.split(pattern1).join(newLink1);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed Header Map link in ' + file);
  }
});
