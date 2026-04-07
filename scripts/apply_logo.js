const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (!name.includes('node_modules')) getHtmlFiles(name, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(name);
    }
  });
  return fileList;
}

const rootDir = path.join(__dirname, '..');
const htmlFiles = getHtmlFiles(rootDir);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Ensure logo-box is normalized
  // (Most use the CSS we already updated, but we can ensure they have the class correctly)
  if (content.includes('logo-box')) {
     // Already updated via CSS, no HTML change needed unless structure is weird
  }

  // 2. Specific fix for admin dashboard logo
  if (file.includes('admin-dashboard.html')) {
      const adminLogoRegex = /<div class="admin-logo">[\s\S]*?<\/div>/;
      const newAdminLogo = `<div class="admin-logo">
      <img src="../images/logo.png" alt="Logo" style="width: 80px; height: 80px; margin-bottom: 15px;">
      <span style="display:block; font-size: 11px; opacity:0.6; font-weight:600; letter-spacing:1px; color:#fff;">ADMIN PANEL v2.0</span>
    </div>`;
      if (adminLogoRegex.test(content)) {
          content = content.replace(adminLogoRegex, newAdminLogo);
          modified = true;
      }
      
      // Update internal style for admin logo padding if needed
      content = content.replace(/padding: 30px 20px;/, 'padding: 20px;');
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Updated logo in: ${path.relative(rootDir, file)}`);
  }
});

console.log('Branding normalization complete.');
