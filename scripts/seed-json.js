const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

const LISTINGS_DATA = [
  { name: "সুলতান'স ডাইন", category: "খাবার", division: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", address: "১৪৬/জি, গ্রীন অক্ষয় প্লাজা, সাতমসজিদ রোড, ধানমন্ডি, ঢাকা", description: "ঐতিহ্যবাহী কাচ্চি বিরিয়ানি এবং বাঙালি খাবারের জন্য বিখ্যাত।", icon: "🍛", rating: 4.8, reviews: 1420, phone: "০১৭৭৫-০০৩২১৮", website: "sultansdinebd.com", verified: true, featured: true, premium: true, isLive: true, views: 1250 },
  { name: "স্টার কাবাব এন্ড রেস্টুরেন্ট", category: "খাবার", division: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", address: "বাড়ি ২২, রোড ২, ধানমন্ডি, ঢাকা", description: "সকালের নাস্তা, কাবাব এবং কাচ্চি বিরিয়ানির জন্য ঢাকার একটি অতি জনপ্রিয় নাম।", icon: "🍛", rating: 4.5, reviews: 3100, phone: "০২২২৩-৩৬৬৯০৪", verified: true, featured: true, premium: false, isLive: true, views: 2100 },
  { name: "মেঘনা কিচেন", category: "খাবার", division: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", address: "৩২/এ ধানমন্ডি লেক রোড, ঢাকা-১২০৫", description: "ঐতিহ্যবাহী বাংলা রান্না ও কাচ্চি বিরিয়ানিতে স্পেশালাইজড।", icon: "🍛", rating: 4.8, reviews: 342, phone: "০১৭১২-৩৪৫৬৭৮", website: "meghna-kitchen.com.bd", verified: true, featured: true, premium: false, isLive: true, views: 450 },
  { name: "ক্যাফে ম্যাংগো", category: "খাবার", division: "রাজশাহী", district: "রাজশাহী সদর", area: "সোনাদিঘি মোড়", address: "সোনাদিঘি মোড়, রাজশাহী", description: "তরুণদের পছন্দের আড্ডাস্থল, দারুণ কফি এবং ফাস্ট ফুড।", icon: "☕", rating: 4.5, reviews: 410, phone: "০১৭৯৯-৮৮৭৭৬৬", website: "cafemango.com.bd", verified: true, featured: false, premium: false, isLive: true, views: 320 },
  { name: "পিৎজা হাট (Pizza Hut)", category: "খাবার", division: "চট্টগ্রাম", district: "চট্টগ্রাম সদর", area: "জিইসি মোড়", address: "জিইসি মোড়, সিডিএ এভিনিউ, চট্টগ্রাম", description: "বিশ্বমানের পিৎজা, পাস্তা এবং গার্লিক ব্রেড।", icon: "🍕", rating: 4.4, reviews: 5200, phone: "০৯৬৬৬-৭৭৭৮৮৮", website: "pizzahutbd.com", verified: true, featured: true, premium: true, isLive: true, views: 5600 },
  { name: "স্কয়ার হাসপাতাল লিমিটেড", category: "স্বাস্থ্য", division: "ঢাকা", district: "ঢাকা সদর", area: "পান্থপথ", address: "১৮/এফ, পান্থপথ, ঢাকা ১২০৫", description: "উন্নত এবং আন্তর্জাতিক মানের চিকিৎসা সেবা।", icon: "🏥", rating: 4.6, reviews: 890, phone: "১০৬১৬", website: "squarehospital.com", verified: true, featured: true, premium: false, isLive: true, views: 980 },
  { name: "পপুলার ডায়াগনস্টিক", category: "স্বাস্থ্য", division: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", address: "বাড়ি ১৬, রোড ২, ধানমন্ডি, ঢাকা", description: "অত্যাধুনিক যন্ত্রপাতি ও দেশসেরা ডাক্তারদের সম্পন্ন নির্ভরযোগ্য ডায়াগনস্টিক সেন্টার।", icon: "🏥", rating: 4.4, reviews: 7500, phone: "০৯৬১৩-৭৮৭৮০২", website: "populardiagnostic.com", verified: true, featured: false, premium: true, isLive: true, views: 1200 },
  { name: "ডক্টর মনির ক্লিনিক", category: "স্বাস্থ্য", division: "চট্টগ্রাম", district: "চট্টগ্রাম সদর", area: "আগ্রাবাদ", address: "৫৬ আগ্রাবাদ সি/এ, চট্টগ্রাম", description: "সার্বক্ষণিক মেডিকেল সেবা, ডায়াবেটিস ও হার্ট বিশেষজ্ঞ।", icon: "🩺", rating: 4.9, reviews: 215, phone: "০১৮১৯-২৩৪৫৬৭", website: "drmonirclinic.com", verified: true, featured: false, premium: false, isLive: true, views: 410 },
  { name: "ইবনে সিনা ডায়াগনস্টিক", category: "স্বাস্থ্য", division: "সিলেট", district: "সিলেট সদর", area: "সুবিদবাজার", address: "সুবিদবাজার পয়েন্ট, সিলেট", description: "সারা বাংলাদেশের স্বনামধন্য একটি মেডিকেল এবং প্যাথলজি সেবা প্রদানকারী প্রতিষ্ঠান।", icon: "🏥", rating: 4.5, reviews: 1540, phone: "০৮২১-৭২৭০৮২", website: "ibnesinatrust.com", verified: true, featured: true, premium: true, isLive: true, views: 890 },
  { name: "ব্র্যাক বিশ্ববিদ্যালয়", category: "শিক্ষা", division: "ঢাকা", district: "ঢাকা সদর", area: "বাড্ডা", address: "ম-২২৬৫, প্রগতি সরণি, মেরুল বাড্ডা, ঢাকা ১২১২", description: "দেশের শীর্ষস্থানীয় বেসরকারি বিশ্ববিদ্যালয়।", icon: "📚", rating: 4.7, reviews: 560, phone: "০৯৬৩৮-৪৬৪৬৪৬", website: "bracu.ac.bd", verified: true, featured: false, premium: false, isLive: true, views: 1540 },
  { name: "রাজশাহী সেরা কোচিং", category: "শিক্ষা", division: "রাজশাহী", district: "রাজশাহী সদর", area: "বোয়ালিয়া", address: "বোয়ালিয়া, রাজশাহী", description: "এসএসসি ও এইচএসসি পরীক্ষার্থীদের জন্য বিশেষায়িত কোচিং।", icon: "📝", rating: 4.7, reviews: 189, phone: "০১৭৫৫-৪৫৬৭৮৯", website: "rajshahicoaching.com", verified: true, featured: true, premium: false, isLive: true, views: 230 },
  { name: "টমি মিয়া'স ইনস্টিটিউট", category: "শিক্ষা", division: "সিলেট", district: "সিলেট সদর", area: "উপশহর", address: "শাহজালাল উপশহর, সিলেট", description: "হোটেল ম্যানেজমেন্ট এবং রন্ধনশিল্পের উপর প্রফেশনাল কারিগরি শিক্ষা প্রদান।", icon: "👨‍🍳", rating: 4.6, reviews: 130, phone: "০১৭৮৯-৪৫৬১২৩", website: "tommymiah.com", verified: true, featured: false, premium: false, isLive: true, views: 180 },
  { name: "ঢাকা বিশ্ববিদ্যালয় (DU)", category: "শিক্ষা", division: "ঢাকা", district: "ঢাকা সদর", area: "শাহবাগ", address: "নীলক্ষেত રોড, শাহবাগ, ঢাকা", description: "বাংলাদেশের প্রাচ্যের অক্সফোর্ড খ্যাত সর্ববৃহৎ এবং প্রাচীনতম পাবলিক বিশ্ববিদ্যালয়।", icon: "🏛️", rating: 4.9, reviews: 15400, phone: "০২-৯৬৬১৯০০", website: "du.ac.bd", verified: true, featured: true, premium: true, isLive: true, views: 45000 },
  { name: "প্রোগ্রামিং হিরো", category: "আইটি", division: "ঢাকা", district: "ঢাকা সদর", area: "বনানী", address: "হাউজ ৪, রোড ১১, বনানী, ঢাকা", description: "সেরা আইটি ট্রেইনিং এবং ওয়েব ডেভেলপমেন্ট কোর্স।", icon: "💻", rating: 4.8, reviews: 850, phone: "০১৭৭৭-৪৪খখ২২", website: "web.programming-hero.com", verified: true, featured: false, premium: true, isLive: true, views: 5600 },
  { name: "ব্রেইনস্টেশন ২৩", category: "আইটি", division: "ঢাকা", district: "ঢাকা সদর", area: "মহাখালী", address: "মহাখালী ডিওএইচএস, ঢাকা", description: "শীর্ষস্থানীয় গ্লোবাল সফটওয়্যার ডেভেলপমেন্ট ও আইটি সলিউশন কোম্পানি।", icon: "🏢", rating: 4.7, reviews: 120, phone: "০১৭০৩-১১২১৮৮", website: "brainstation-23.com", verified: true, featured: true, premium: false, isLive: true, views: 900 },
  { name: "নর্দান আইটি সলিউশন", category: "আইটি", division: "রংপুর", district: "দিনাজপুর", area: "বালুবাড়ী", address: "বালুবাড়ী, দিনাজপুর", description: "স্থানীয় ব্যবসা প্রতিষ্ঠানের জন্য ইআরপি ও POS সফটওয়্যার সরবরাহকারী।", icon: "⚙️", rating: 4.7, reviews: 40, phone: "০১৫৫৫-৮৮৮৯৯৯", website: "northernit.net", verified: false, featured: false, premium: false, isLive: true, views: 150 },
  { name: "ক্রিয়েটিভ আইটি ইনস্টিটিউট", category: "আইটি", division: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", address: "মমতাজ প্লাজা, ধানমন্ডি, ঢাকা", description: "বাংলাদেশের অন্যতম সেরা আইটি ট্রেনিং ইন্সটিটিউট।", icon: "💻", rating: 4.8, reviews: 4500, phone: "০১৬২৪-৬৬৬৪৪৪", website: "creativeitinstitute.com", verified: true, featured: true, premium: true, isLive: true, views: 12000 },
  { name: "이ভ্যালুয়েশন আইটি", category: "ফ্রিল্যান্সিং", division: "ময়মনসিংহ", district: "ময়মনসিংহ সদর", area: "চরপাড়া", address: "চরপাড়া মোড়, ময়মনসিংহ", description: "গ্রাফিক্স ডিজাইন, এসইও এবং ডেটা এন্ট্রির সেরা ফ্রিল্যান্স সার্ভিস।", icon: "🎨", rating: 4.6, reviews: 90, phone: "০১৭৩৩-৯৯৮৮৭৭", website: "evaluationit.com", verified: true, featured: false, premium: false, isLive: true, views: 300 },
  { name: "কোডারট্রাস্ট বাংলাদেশ", category: "ফ্রিল্যান্সিং", division: "ঢাকা", district: "ঢাকা সদর", area: "বনানী", address: "হাউজ ৮২, ব্লক ই, বনানী, ঢাকা", description: "ফ্রিল্যান্সিং ক্যারিয়ার গড়ার জন্য স্কিল ডেভেলপমেন্ট ট্রেইনিং প্রোভাইডোর।", icon: "💻", rating: 4.5, reviews: 450, phone: "০১৭৮৭-৬৫৪৩২১", website: "codertrustbd.com", verified: true, featured: true, premium: true, isLive: true, views: 950 },
  { name: "খুলনা এসইও এক্সপার্টস", category: "ফ্রিল্যান্সিং", division: "খুলনা", district: "খুলনা সদর", area: "বয়রা", address: "বয়রা বাজার, খুলনা", description: "ছোট ও মাঝারি ব্যবসায়ের জন্য এসইও এবং গুগল র‍্যাংকিং সার্ভিস।", icon: "📈", rating: 4.9, reviews: 22, phone: "০১৭৪৪-৫৫৫৬৬৬", website: "khulnaseo.com", verified: false, featured: false, premium: false, isLive: true, views: 120 },
  { name: "দারাজ বাংলাদেশ", category: "কোম্পানি", division: "ঢাকা", district: "ঢাকা সদর", area: "তেজগাঁও", address: "উডল্যান্ড সেন্টার, তেজগাঁও শিল্প এলাকা, ঢাকা", description: "বাংলাদেশের সবচেয়ে বড় ই-কমার্স প্ল্যাটফর্ম।", icon: "🛒", rating: 4.1, reviews: 90050, phone: "১৬৪৯২", website: "daraz.com.bd", verified: true, featured: true, premium: true, isLive: true, views: 154000 },
  { name: "প্রাণ-আরএফএল গ্রুপ", category: "কোম্পানি", division: "ঢাকা", district: "ঢাকা সদর", area: "বাড্ডা", address: "প্রাণ সেন্টার, ১০৫ প্রগতি সরণি, বাড্ডা, ঢাকা", description: "বাংলাদেশের অন্যতম বৃহত্তর খাদ্যদ্রব্য এবং প্লাস্টিক প্রস্তুতকারক কোম্পানি।", icon: "🏢", rating: 4.4, reviews: 3200, phone: "০৯৬১৩-৭৩৭১২", website: "pranfoods.net", verified: true, featured: true, premium: false, isLive: true, views: 15000 },
  { name: "রবি আজিয়াটা লিমিটেড", category: "কোম্পানি", division: "ঢাকা", district: "ঢাকা সদর", area: "গুলশান", address: "রবি কর্পোরেট অফিস, গুলশান ১, ঢাকা", description: "দেশের অন্যতম বৃহৎ টেলিকম অপারেটর এবং ডিজিটাল সার্ভিস প্রোভাইডার।", icon: "📱", rating: 4.3, reviews: 5400, phone: "১২১", website: "robi.com.bd", verified: true, featured: false, premium: true, isLive: true, views: 12000 },
  { name: "বসুন্ধরা সিটি শপিং কমপ্লেক্স", category: "ছোট ব্যবসা", division: "ঢাকা", district: "ঢাকা সদর", area: "পান্থপথ", address: "পান্থপথ, ঢাকা ১২১৫", description: "দেশের অন্যতম বৃহৎ শপিং মল। হাজারো ব্র‍্যান্ডের দোকান।", icon: "🛍", rating: 4.5, reviews: 2100, phone: "০২-৯১১১৪৪০", website: "bashundharacity.com", verified: true, featured: true, premium: true, isLive: true, views: 45000 },
  { name: "আহমেদ টিম্বারস", category: "ছোট ব্যবসা", division: "খুলনা", district: "খুলনা সদর", area: "ডাকবাংলো", address: "ডাকবাংলো মোড়, খুলনা", description: "উন্নত মানের সেগুন, মেহগনি এবং অন্যান্য কাঠ।", icon: "🪵", rating: 4.1, reviews: 65, phone: "০১৫৫৫-৬৬৬৭৭৭", verified: false, featured: false, premium: false, isLive: true, views: 230 },
  { name: "মায়ের দোয়া ইলেকট্রনিক্স", category: "ছোট ব্যবসা", division: "বরিশাল", district: "বরিশাল সদর", area: "চকবাজার", address: "চকবাজার, বরিশাল", description: "ল্যাপটপ, মোবাইল এবং গ্যাজেট মেরামতের নির্ভরযোগ্য সার্ভিস পয়েন্ট।", icon: "🔌", rating: 4.0, reviews: 45, phone: "০১৯১১-২২৩৩৪৪", verified: false, featured: false, premium: false, isLive: true, views: 180 },
  { name: "পাঠাও লিমিটেড", category: "পরিবহন", division: "ঢাকা", district: "ঢাকা সদর", area: "গুলশান", address: "রোড ২৯, হাউজ ২, গুলশান-১, ঢাকা", description: "জনপ্রিয় রাইড শেয়ারিং, ফুড ডেলিভারি এবং পার্সেল সার্ভিস।", icon: "🛵", rating: 4.2, reviews: 3100, phone: "০৯৬১০-০৯৬১০", website: "pathao.com", verified: true, featured: false, premium: false, isLive: true, views: 12000 },
  { name: "শ্যামলী এন আর ট্রাভেলস", category: "পরিবহন", division: "ঢাকা", district: "ঢাকা সদর", area: "কল্যাণপুর", address: "কল্যাণপুর বাস স্ট্যান্ড, ঢাকা", description: "সারা বাংলাদেশে নিরাপদ এবং আরামদায়ক এসি/নন-এসি বাস সার্ভিস।", icon: "🚍", rating: 4.3, reviews: 1200, phone: "০১৭৩৩-৪৪৩৩২২", website: "shyamolitickets.com", verified: true, featured: true, premium: false, isLive: true, views: 8900 },
  { name: "উবার বাংলাদেশ", category: "পরিবহন", division: "ঢাকা", district: "ঢাকা সদর", area: "বনানী", address: "বনানী, ঢাকা", description: "বিশ্বের জনপ্রিয়তম রাইড এবং টেক্সি সার্ভিস প্রোভাইডার।", icon: "🚕", rating: 4.4, reviews: 5600, phone: "অ্যাপ মাধ্যমে", website: "uber.com/bd/en", verified: true, featured: false, premium: true, isLive: true, views: 15000 },
  { name: "গ্রিন ভ্যালি রিসোর্ট", category: "আবাসন", division: "সিলেট", district: "সিলেট সদর", area: "খাদিমনগর", address: "খাদিমনগর, সিলেট-তামাবিল রোড, সিলেট", description: "চা বাগান এবং প্রকৃতির কোলে গড়ে ওঠা একটি শান্তিময় রিসোর্ট।", icon: "🏨", rating: 4.4, reviews: 320, phone: "০১৮৮৮-০০০৯৯৯", website: "greenvalley.com", verified: true, featured: false, premium: true, isLive: true, views: 900 },
  { name: "হোটেল র্যাডিসন ব্লু ওয়াটার গার্ডেন", category: "আবাসন", division: "ঢাকা", district: "ঢাকা সদর", area: "ক্যান্টনমেন্ট", address: "এয়ারপোর্ট রোড, ক্যান্টনমেন্ট, ঢাকা", description: "আন্তর্জাতিক ৫-তারা মানের হোটেল। অসাধারণ আতিথেয়তা।", icon: "🛏️", rating: 4.8, reviews: 8500, phone: "০২-৯৮৩৪৫৫৫", website: "radissonhotels.com", verified: true, featured: true, premium: true, isLive: true, views: 12000 },
  { name: "লং বিচ হোটেল", category: "আবাসন", division: "চট্টগ্রাম", district: "কক্সবাজার", area: "কলাতলী", address: "কলাতলী রোড, কক্সবাজার", description: "বাংলাদেশের দীর্ঘতম সমুদ্রসৈকতের পাশে অবস্থিত বিলাসবহুল ৫-তারা হোটেল।", icon: "🏖️", rating: 4.6, reviews: 4200, phone: "০১৮১৯-২২২২২২", website: "longbeachhotelbd.com", verified: true, featured: true, premium: false, isLive: true, views: 9500 },
  { name: "আড়ং", category: "ফ্যাশন", division: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", address: "বাড়ি ১, রোড ২, মিরপুর রোড, ধানমন্ডি, ঢাকা", description: "ঐতিহ্যবাহী বাংলাদেশি পোশাক ও হস্তশিল্পের নির্ভরযোগ্য প্রতিষ্ঠান।", icon: "👗", rating: 4.9, reviews: 4500, phone: "০৯৬১১-২২৩৪৩৪", website: "aarong.com", verified: true, featured: true, premium: true, isLive: true, views: 25000 },
  { name: "সেইলর (Sailor)", category: "ফ্যাশন", division: "ঢাকা", district: "ঢাকা সদর", area: "যমুনা ফিউচার পার্ক", address: "যমুনা ফিউচার পার্ক, লেভেল ১", description: "দেশের অন্যতম জনপ্রিয় প্রিমিয়াম ফ্যাশন লাইফস্টাইল ব্র্যান্ড।", icon: "👔", rating: 4.7, reviews: 850, phone: "০১৭৩৩-৯৯৯৯৯৯", website: "sailor.clothing", verified: true, featured: false, premium: true, isLive: true, views: 5600 },
  { name: "ইলোরা জুয়েলার্স", category: "ফ্যাশন", division: "চট্টগ্রাম", district: "চট্টগ্রাম সদর", area: "নিউ মার্কেট", address: "বিপণী বিতান (নিউ মার্কেট), চট্টগ্রাম", description: "বিশ্বস্ত স্বর্ণ, ডায়মন্ড ও রূপার গহনা নির্মাতা।", icon: "💍", rating: 4.4, reviews: 310, phone: "০৩১-৬৬৬৯৯৯", website: "ellorajewellers.com", verified: true, featured: false, premium: false, isLive: true, views: 1200 },
  { name: "সবুজ বীজ ভান্ডার", category: "কৃষি", division: "রংপুর", district: "রংপুর সদর", area: "পayরা চত্বর", address: "পায়রা চত্বর, রংপুর", description: "উন্নত মানের বীজ এবং সার-কীটনাশক সরবরাহকারী। কৃষকের বিশ্বস্ত বন্ধু।", icon: "🌾", rating: 4.3, reviews: 230, phone: "০১৮১১-২২৩৩৪৪", verified: false, featured: false, premium: false, isLive: true, views: 450 },
  { name: "আধুনিক কৃষি খামার লিমিটেড", category: "কৃষি", division: "রাজশাহী", district: "বগুড়া", area: "শেরপুর", address: "শেরপুর হাইওয়ে, বগুড়া", description: "বিষমুক্ত শাকসবজি এবং উন্নত জাতের গাভী পালন।", icon: "🚜", rating: 4.6, reviews: 85, phone: "০১৭৩৩-১১২২৮৮", verified: true, featured: true, premium: false, isLive: true, views: 120 },
  { name: "এসিআই এগ্রিবিজনেস", category: "কৃষি", division: "ঢাকা", district: "ঢাকা সদর", area: "তেজগাঁও", address: "এসিআই সেন্টার, ২৪৫ তেজগাঁও, ঢাকা", description: "বাংলাদেশের কৃষিক্ষেত্রে আধুনিকায়ন এবং কৃষকদের সেরা উপকরণ প্রদান।", icon: "🌱", rating: 4.8, reviews: 1100, phone: "০২-৯৮৮৫৬৭৩", website: "aciagribusiness.com", verified: true, featured: true, premium: true, isLive: true, views: 8900 }
];

function newId() {
  return crypto.randomBytes(12).toString('hex');
}

function seed() {
  const adminId = newId();
  const db = {
    users: [
      {
        _id: adminId,
        name: "S@bit Admin",
        email: "s@bit",
        password: "s@bit104",
        registeredAt: new Date().toISOString()
      }
    ],
    listings: LISTINGS_DATA.map(l => ({
      ...l,
      _id: newId(),
      userId: adminId,
      createdAt: new Date().toISOString()
    }))
  };

  if (!fs.existsSync(path.join(__dirname, '..', 'data'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'data'));
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(`✅ Success! ${db.listings.length} listings seeded to data/db.json`);
}

seed();
