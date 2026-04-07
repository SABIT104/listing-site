const fs = require('fs');
const path = require('path');
const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  let mapLink = 'map.html';

  if (file === 'food.html') mapLink = 'map.html?cat=খাবার';
  if (file === 'health.html') mapLink = 'map.html?cat=স্বাস্থ্য';
  if (file === 'education.html') mapLink = 'map.html?cat=শিক্ষা';
  if (file === 'accommodation.html') mapLink = 'map.html?cat=আবাসন';
  if (file === 'company.html') mapLink = 'map.html?cat=কোম্পানি';
  if (file === 'freelancing.html') mapLink = 'map.html?cat=ফ্রিল্যান্সিং';
  if (file === 'it.html') mapLink = 'map.html?cat=আইটি';
  if (file === 'small-business.html') mapLink = 'map.html?cat=ছোট ব্যবসা';
  if (file === 'transport.html') mapLink = 'map.html?cat=পরিবহন';
  
  const pattern1 = '<a href="#">ম্যাপ</a>';
  const newLink1 = '<a href="' + mapLink + '">ম্যাপ</a>';

  if (content.includes(pattern1)) {
    content = content.split(pattern1).join(newLink1);
    changed = true;
  }

  // Also replace any old links if they were already partially replaced
  const pattern2 = '<a href="map.html">ম্যাপ</a>';
  if (content.includes(pattern2) && mapLink !== 'map.html') {
    content = content.split(pattern2).join(newLink1);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed Header Map link in ' + file);
  }
});
