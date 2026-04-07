const fs = require('fs');
const path = require('path');
const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  const targetText = '<p style="color: #ccc; font-size: 14px;">বাংলাদেশের সবচেয়ে বড় এবং বিশ্বস্ত ডিজিটাল ইয়েলো পেজেস এবং ডিরেক্টরি। আপনার প্রয়োজনীয় সব ব্যবসা এক ঠিকানায়।</p>';
  const replacementText = targetText + '\\n          <div style="margin-top: 15px;"><a href="admin-login.html" style="color: #777; font-size: 13px; text-decoration: none; border: 1px solid #333; padding: 4px 10px; border-radius: 4px; transition: all 0.2s;">🔒 অ্যাডমিন প্যানেল</a></div>';

  if (content.includes(targetText) && !content.includes('admin-login.html')) {
    content = content.replace(targetText, replacementText);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Added Admin link to ' + file);
  }
});
