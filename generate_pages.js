const fs = require('fs');
const path = require('path');

const template = fs.readFileSync(path.join(__dirname, 'listings.html'), 'utf-8');

const pages = [
  { file: 'food.html', targetHref: 'food.html', bdTitle: 'খাবার' },
  { file: 'health.html', targetHref: 'health.html', bdTitle: 'স্বাস্থ্য' },
  { file: 'education.html', targetHref: 'education.html', bdTitle: 'শিক্ষা' },
  { file: 'small-business.html', targetHref: 'small-business.html', bdTitle: 'ছোট ব্যবসা' },
  { file: 'freelancing.html', targetHref: 'freelancing.html', bdTitle: 'ফ্রিল্যান্সিং' },
  { file: 'company.html', targetHref: 'company.html', bdTitle: 'কোম্পানি' },
  { file: 'it.html', targetHref: 'it.html', bdTitle: 'আইটি' },
  { file: 'transport.html', targetHref: 'transport.html', bdTitle: 'পরিবহন' },
  { file: 'accommodation.html', targetHref: 'accommodation.html', bdTitle: 'আবাসন' }
];

pages.forEach(page => {
  let content = template;
  
  // Remove active from any tab
  content = content.replace(/class="cat-tab active"/g, 'class="cat-tab"');
  
  // Add active to the target tab
  // E.g. href="food.html" class="cat-tab" -> href="food.html" class="cat-tab active"
  const targetRe = new RegExp(`href="${page.targetHref}" class="cat-tab"`);
  content = content.replace(targetRe, `href="${page.targetHref}" class="cat-tab active"`);
  
  // Update Breadcrumb text
  content = content.replace('হোম › সব ব্যবসা', `হোম › ${page.bdTitle}`);

  fs.writeFileSync(path.join(__dirname, page.file), content, 'utf-8');
});

console.log('Pages generated successfully!');
