const fs = require('fs');
const path = require('path');
const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  // Replace links in .topbar-links
  const linksToReplace = [
    {old: '<a href="#">লগইন</a> | <a href="#">রেজিস্ট্রেশন</a> | <a href="#">সাহায্য</a>', 
     new: '<a href="login.html">লগইন</a> | <a href="register.html">রেজিস্ট্রেশন</a> | <a href="faq.html">সাহায্য</a>'},
     
    // If contact.html was used for help before
    {old: '<a href="login.html">লগইন</a> | <a href="register.html">রেজিস্ট্রেশন</a> | <a href="contact.html">সাহায্য</a>',
     new: '<a href="login.html">লগইন</a> | <a href="register.html">রেজিস্ট্রেশন</a> | <a href="faq.html">সাহায্য</a>'}
  ];

  for (const pair of linksToReplace) {
    if (content.includes(pair.old)) {
      content = content.replace(pair.old, pair.new);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Fixed topbar in ' + file);
  }
});
