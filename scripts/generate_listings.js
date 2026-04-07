const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function newId() {
  return crypto.randomBytes(12).toString('hex');
}

const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const categories = [
  { name: 'খাবার', icons: ['🍛', '🍲', '🍕', '🍔', '🍰'] },
  { name: 'স্বাস্থ্য', icons: ['🏥', '💊', '🩺', '🦷', '🚑'] },
  { name: 'শিক্ষা', icons: ['📚', '🎓', '🏫', '✏️', '📖'] },
  { name: 'আইটি', icons: ['⚙️', '💻', '🖱️', '🖥️', '📡'] },
  { name: 'পরিবহন', icons: ['🚌', '🚚', '🚲', '⛴️', '🚗'] },
  { name: 'আবাসন', icons: ['🏠', '🏢', '🏨', '🏰', '🏘️'] },
  { name: 'কোম্পানি', icons: ['🏢', '📊', '💼', '🤝', '🏗️'] },
  { name: 'ফ্রিল্যান্সিং', icons: ['💻', '🖋️', '🎨', '🚀', '📈'] },
  { name: 'শপিং', icons: ['🛍️', '🛒', '👕', '🎁', '👟'] }
];

const divisions = [
  { name: 'ঢাকা', districts: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'সাভার'] },
  { name: 'চট্টগ্রাম', districts: ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী'] },
  { name: 'রাজশাহী', districts: ['রাজশাহী', 'বগুড়া', 'পাবনা', 'নাটোর'] },
  { name: 'খুলনা', districts: ['খুলনা', 'যশোর', 'বাগেরহাট', 'কুষ্টিয়া'] },
  { name: 'বরিশাল', districts: ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'ঝালকাঠি'] },
  { name: 'সিলেট', districts: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'] },
  { name: 'রংপুর', districts: ['রংপুর', 'দিনাজপুর', 'গাইবান্ধা', 'কুড়িগ্রাম'] },
  { name: 'ময়মনসিংহ', districts: ['ময়মনসিংহ', 'নেত্রকোণা', 'শেরপুর', 'জামালপুর'] }
];

const suffixes = ['এন্টারপ্রাইজ', 'এজেন্সি', 'সার্ভিস', 'স্টোর', 'পয়েন্ট', 'মার্ট', 'হাসপাতাল', 'একাডেমি', 'সলিউশন', 'কুইজিন'];

console.log('🚀 Starting listing generation (500 entries)...');

for (let i = 0; i < 500; i++) {
  const cat = categories[Math.floor(Math.random() * categories.length)];
  const div = divisions[Math.floor(Math.random() * divisions.length)];
  const dist = div.districts[Math.floor(Math.random() * div.districts.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const listing = {
    _id: newId(),
    name: `বিজনেস ${i + 100} ${suffix}`,
    category: cat.name,
    div: div.name,
    district: dist,
    area: dist + ' সদর',
    description: `আমাদের এখানে উন্নত মানের ${cat.name} সেবা প্রদান করা হয়। আমরা সেরা মানের অভিজ্ঞতার গ্যারান্টি দিচ্ছি।`,
    icon: cat.icons[Math.floor(Math.random() * cat.icons.length)],
    rating: (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1),
    reviews: Math.floor(Math.random() * 1200) + 12,
    phone: '০১৭-' + Math.floor(10000000 + Math.random() * 90000000),
    verified: Math.random() > 0.3,
    featured: Math.random() > 0.8,
    premium: Math.random() > 0.85,
    isLive: true,
    createdAt: new Date().toISOString()
  };
  
  db.listings.push(listing);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('✅ 500 listings added successfully to data/db.json');
