const fs = require('fs');
const filePath = 'login.html';
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/href="#"(.*?)>পাসওয়ার্ড ভুলে গেছেন\?<\/a>/, 'href="forgot-password.html"$1>পাসওয়ার্ড ভুলে গেছেন?</a>');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed link in login.html');
}
