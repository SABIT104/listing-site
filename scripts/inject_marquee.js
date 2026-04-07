const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html'); // handled index already

const marqueeHtml = `
  <!-- PART 3.5: MARQUEE AD -->
  <div class="marquee-container">
    <div class="marquee-content" style="pointer-events: none;">
      <span style="background:var(--red); color:#fff; padding:2px 8px; border-radius:4px; font-size:12px;">বিজ্ঞাপন</span>
      আপনার বিজনেসকে শীর্ষে দেখান — প্রিমিয়াম লিস্টিংয়ে ৩× বেশি ভিজিটর পান 
      <span style="display:inline-block; width: 300px;"></span> 
      <span style="background:var(--red); color:#fff; padding:2px 8px; border-radius:4px; font-size:12px;">বিজ্ঞাপন</span>
      আপনার বিজনেসকে শীর্ষে দেখান — প্রিমিয়াম লিস্টিংয়ে ৩× বেশি ভিজিটর পান
      <span style="display:inline-block; width: 300px;"></span> 
      <span style="background:var(--red); color:#fff; padding:2px 8px; border-radius:4px; font-size:12px;">বিজ্ঞাপন</span>
      আপনার বিজনেসকে শীর্ষে দেখান — প্রিমিয়াম লিস্টিংয়ে ৩× বেশি ভিজিটর পান
    </div>
  </div>
`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('marquee-container')) {
    // Insert after cat-strip closing div
    content = content.replace(/(<div class="cat-strip">[\s\S]*?<\/div>\s*<\/div>)/, `$1\n${marqueeHtml}`);
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Injected marquee into all files.');
