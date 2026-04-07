const fs = require('fs');
const path = require('path');

// 1. Read existing hardcoded data from JS files
// We'll simulate reading them by manually defining the structure or using regex
// Since I have access to the file content, I'll just use the content I read earlier.

const listings = [
  {
    _id: "1", name: "সুলতান'স ডাইন", category: "খাবার", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি",
    description: "ঐতিহ্যবাহী কাচ্চি বিরিয়ানি এবং বাঙালি খাবারের জন্য বিখ্যাত।", icon: "🍛", rating: 4.8, reviews: 1420, phone: "০১৭৭৫-০০৩২১৮", verified: true, featured: true, premium: true, isLive: true, createdAt: new Date().toISOString()
  },
  {
    _id: "2", name: "স্টার কাবাব এন্ড রেস্টুরেন্ট", category: "খাবার", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি",
    description: "সকালের নাস্তা, কাবাব এবং কাচ্চি বিরিয়ানির জন্য জনপ্রিয়।", icon: "🍛", rating: 4.5, reviews: 3100, phone: "০২২২৩-৩৬৬৯০৪", verified: true, featured: true, premium: false, isLive: true, createdAt: new Date().toISOString()
  },
  {
    _id: "6", name: "স্কয়ার হাসপাতাল লিমিটেড", category: "স্বাস্থ্য", div: "ঢাকা", district: "ঢাকা সদর", area: "পান্থপথ",
    description: "উন্নত এবং আন্তর্জাতিক মানের চিকিৎসা সেবা।", icon: "🏥", rating: 4.6, reviews: 890, phone: "১০৬১৬", verified: true, featured: true, premium: false, isLive: true, createdAt: new Date().toISOString()
  },
  {
    _id: "10", name: "ব্র্যাক বিশ্ববিদ্যালয়", category: "শিক্ষা", div: "ঢাকা", district: "ঢাকা সদর", area: "বাড্ডা",
    description: "দেশের শীর্ষস্থানীয় বেসরকারি বিশ্ববিদ্যালয়।", icon: "📚", rating: 4.7, reviews: 560, phone: "০৯৬৩৮-৪৬৪৬৪৬", verified: true, featured: true, premium: false, isLive: true, createdAt: new Date().toISOString()
  },
  {
    _id: "21", name: "দারাজ বাংলাদেশ", category: "কোম্পানি", div: "ঢাকা", district: "ঢাকা সদর", area: "তেজগাঁও",
    description: "বাংলাদেশের সবচেয়ে বড় ই-কমার্স প্ল্যাটফর্ম।", icon: "🛒", rating: 4.1, reviews: 90050, phone: "১৬৪৯২", verified: true, featured: true, premium: true, isLive: true, createdAt: new Date().toISOString()
  }
];

const blogs = [
  {
    _id: "b1",
    category: "ব্যবসা ও প্রবৃদ্ধি",
    title: "ডিজিটাল মার্কেটিং এর মাধ্যমে ব্যবসার প্রসার",
    excerpt: "বর্তমান সময়ে ছোট ব্যবসাকে অনলাইনে নিয়ে আসা এবং সঠিক ক্রেতাদের কাছে পৌঁছানোর দারুণ সব উপায়...",
    content: "এখানে বিস্তারিত কন্টেন্ট থাকবে...",
    date: new Date().toISOString(),
    icon: "📊"
  },
  {
    _id: "b2",
    category: "ই-কমার্স টিপস",
    title: "লোকাল এসইও (Local SEO) কেন জরুরি?",
    excerpt: "আপনার এলাকার কাস্টমার যেন গুগল ম্যাপসে সহজেই আপনার দোকান খুঁজে পায়, তার জন্য যা করতে হবে...",
    content: "এখানে বিস্তারিত কন্টেন্ট থাকবে...",
    date: new Date().toISOString(),
    icon: "🛒"
  }
];

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

function seed() {
  const db = {
    users: [],
    listings: listings,
    blogs: blogs
  };
  
  if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH));
  }
  
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log('✅ Database seeded successfully with initial listings and blogs!');
}

seed();
