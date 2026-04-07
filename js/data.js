const LISTINGS = [
  // ==================== ১. খাবার (Food) ====================
  {
    id: 1, name: "সুলতান'স ডাইন", cat: "খাবার", catLabel: "রেস্টুরেন্ট", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", addr: "১৪৬/জি, গ্রীন অক্ষয় প্লাজা, সাতমসজিদ রোড, ধানমন্ডি, ঢাকা",
    desc: "ঐতিহ্যবাহী কাচ্চি বিরিয়ানি এবং বাঙালি খাবারের জন্য বিখ্যাত। আমাদের রয়েছে আরামদায়ক পরিবেশ।", icon: "🍛", rating: 4.8, reviews: 1420, phone: "০১৭৭৫-০০৩২১৮", web: "sultansdinebd.com", email: "info@sultansdinebd.com", hours: "সকাল ১১টা - রাত ১১টা", verified: true, featured: true, premium: true, open: true, tags: ["কাচ্চি", "বিরিয়ানি"], lat: 23.7272, lng: 90.3473
  },
  {
    id: 2, name: "স্টার কাবাব এন্ড রেস্টুরেন্ট", cat: "খাবার", catLabel: "রেস্টুরেন্ট", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", addr: "বাড়ি ২২, রোড ২, ধানমন্ডি, ঢাকা",
    desc: "সকালের নাস্তা, কাবাব এবং কাচ্চি বিরিয়ানির জন্য ঢাকার একটি অতি জনপ্রিয় নাম।", icon: "🍛", rating: 4.5, reviews: 3100, phone: "০২২২৩-৩৬৬৯০৪", web: "", email: "", hours: "সকাল ৬টা - রাত ১২টা", verified: true, featured: true, premium: false, open: true, tags: ["কাবাব", "বাঙালি"], lat: 23.7595, lng: 90.3890
  },
  {
    id: 3, name: "মেঘনা কিচেন", cat: "খাবার", catLabel: "রেস্টুরেন্ট", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", addr: "৩২/এ ধানমন্ডি লেক রোড, ঢাকা-১২০৫",
    desc: "ঐতিহ্যবাহী বাংলা রান্না ও কাচ্চি বিরিয়ানিতে স্পেশালাইজড। শুধুমাত্র ডেলিভারি ও কর্পোরেট অর্ডারের জন্য প্রযোজ্য।", icon: "🍛", rating: 4.8, reviews: 342, phone: "০১৭১২-৩৪৫৬৭৮", web: "meghna-kitchen.com.bd", email: "", hours: "সকাল ১১টা - রাত ১২টা", verified: true, featured: true, premium: false, open: true, tags: ["হোম ডেলিভারি", "কাচ্চি"], lat: 23.7344, lng: 90.3707
  },
  {
    id: 4, name: "ক্যাফে ম্যাংগো", cat: "খাবার", catLabel: "ক্যাফে", div: "রাজশাহী", district: "রাজশাহী সদর", area: "সোনাদিঘি মোড়", addr: "সোনাদিঘি মোড়, রাজশাহী",
    desc: "তরুণদের পছন্দের আড্ডাস্থল, দারুণ কফি এবং ফাস্ট ফুড। ফ্রি ওয়াইফাই সুবিধা রয়েছে।", icon: "☕", rating: 4.5, reviews: 410, phone: "০১৭৯৯-৮৮৭৭৬৬", web: "cafemango.com.bd", email: "", hours: "বিকাল ৩টা - রাত ১০টা", verified: true, featured: false, premium: false, open: true, tags: ["কফি", "ফাস্ট ফুড"], lat: 24.3485, lng: 88.6223
  },
  {
    id: 5, name: "পিৎজা হাট (Pizza Hut)", cat: "খাবার", catLabel: "ফাস্ট ফুড", div: "চট্টগ্রাম", district: "চট্টগ্রাম সদর", area: "জিইসি মোড়", addr: "জিইসি মোড়, সিডিএ এভিনিউ, চট্টগ্রাম",
    desc: "বিশ্বমানের পিৎজা, পাস্তা এবং গার্লিক ব্রেড। বন্ধুবান্ধব এবং পরিবারের সাথে আড্ডার সেরা জায়গা।", icon: "🍕", rating: 4.4, reviews: 5200, phone: "০৯৬৬৬-৭৭৭৮৮৮", web: "pizzahutbd.com", email: "", hours: "সকাল ১১টা - রাত ১১টা", verified: true, featured: true, premium: true, open: true, tags: ["পিৎজা", "ফাস্ট ফুড"], lat: 22.3257, lng: 91.7643
  },

  // ==================== ২. স্বাস্থ্য (Health) ====================
  {
    id: 6, name: "স্কয়ার হাসপাতাল লিমিটেড", cat: "স্বাস্থ্য", catLabel: "হাসপাতাল", div: "ঢাকা", district: "ঢাকা সদর", area: "পান্থপথ", addr: "১৮/এফ, পান্থপথ, ঢাকা ১২০৫",
    desc: "উন্নত এবং আন্তর্জাতিক মানের চিকিৎসা সেবা। ২৪ ঘণ্টা ইমার্জেন্সি এবং আইসিইউ সুবিধা।", icon: "🏥", rating: 4.6, reviews: 890, phone: "১০৬১৬", web: "squarehospital.com", email: "info@squarehospital.com", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: true, premium: false, open: true, tags: ["ইমার্জেন্সি", "আইসিইউ"], lat: 23.7124, lng: 90.3565
  },
  {
    id: 7, name: "পপুলার ডায়াগনস্টিক", cat: "স্বাস্থ্য", catLabel: "ডায়াগনস্টিক", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", addr: "বাড়ি ১৬, রোড ২, ধানমন্ডি, ঢাকা",
    desc: "অত্যাধুনিক যন্ত্রপাতি ও দেশসেরা ডাক্তারদের সম্পন্ন নির্ভরযোগ্য প্যাথলজি ও ডায়াগনস্টিক সেন্টার।", icon: "🏥", rating: 4.4, reviews: 7500, phone: "০৯৬১৩-৭৮৭৮০২", web: "populardiagnostic.com", email: "", hours: "সকাল ৭টা - রাত ১১টা", verified: true, featured: false, premium: true, open: true, tags: ["ল্যাব", "টেস্ট"], lat: 23.7578, lng: 90.3940
  },
  {
    id: 8, name: "ডক্টর মনির ক্লিনিক", cat: "স্বাস্থ্য", catLabel: "ক্লিনিক", div: "চট্টগ্রাম", district: "চট্টগ্রাম সদর", area: "আগ্রাবাদ", addr: "৫৬ আগ্রাবাদ সি/এ, চট্টগ্রাম",
    desc: "সার্বক্ষণিক মেডিকেল সেবা, ডায়াবেটিস ও হার্ট বিশেষজ্ঞ। অনলাইন অ্যাপয়েন্টমেন্ট পাওয়া যায়।", icon: "🩺", rating: 4.9, reviews: 215, phone: "০১৮১৯-২৩৪৫৬৭", web: "drmonirclinic.com", email: "", hours: "সকাল ৯টা - রাত ১০টা", verified: true, featured: false, premium: false, open: true, tags: ["অ্যাপয়েন্টমেন্ট", "হার্ট"], lat: 22.3775, lng: 91.7810
  },
  {
    id: 9, name: "ইবনে সিনা ডায়াগনস্টিক", cat: "স্বাস্থ্য", catLabel: "ডায়াগনস্টিক", div: "সিলেট", district: "সিলেট সদর", area: "সুবিদবাজার", addr: "সুবিদবাজার পয়েন্ট, সিলেট",
    desc: "সারা বাংলাদেশের স্বনামধন্য একটি মেডিকেল এবং প্যাথলজি সেবা প্রদানকারী প্রতিষ্ঠান।", icon: "🏥", rating: 4.5, reviews: 1540, phone: "০৮২১-৭২৭০৮২", web: "ibnesinatrust.com", email: "", hours: "সকাল ৭টা - রাত ১০টা", verified: true, featured: true, premium: true, open: true, tags: ["প্যাথলজি", "বিশেষজ্ঞ চিকিৎসক"], lat: 24.9204, lng: 91.8472
  },

  // ==================== ৩. শিক্ষা (Education) ====================
  {
    id: 10, name: "ব্র্যাক বিশ্ববিদ্যালয়", cat: "শিক্ষা", catLabel: "বিশ্ববিদ্যালয়", div: "ঢাকা", district: "ঢাকা সদর", area: "বাড্ডা", addr: "ম-২২৬৫, প্রগতি সরণি, মেরুল বাড্ডা, ঢাকা ১২১২",
    desc: "দেশের শীর্ষস্থানীয় বেসরকারি বিশ্ববিদ্যালয়। আধুনিক শিক্ষার মাধ্যমে দক্ষ মানবসম্পদ তৈরিতে প্রতিশ্রুতিবদ্ধ।", icon: "📚", rating: 4.7, reviews: 560, phone: "০৯৬৩৮-৪৬৪৬৪৬", web: "bracu.ac.bd", email: "admissions@bracu.ac.bd", hours: "সকাল ৮টা - বিকাল ৫টা", verified: true, featured: false, premium: false, open: true, tags: ["উচ্চশিক্ষা", "প্রাইভেট ভার্সিটি"], lat: 23.7565, lng: 90.3434
  },
  {
    id: 11, name: "রাজশাহী সেরা কোচিং", cat: "শিক্ষা", catLabel: "কোচিং সেন্টার", div: "রাজশাহী", district: "রাজশাহী সদর", area: "বোয়ালিয়া", addr: "বোয়ালিয়া, রাজশাহী",
    desc: "এসএসসি ও এইচএসসি পরীক্ষার্থীদের জন্য বিশেষায়িত কোচিং। অভিজ্ঞ শিক্ষকমন্ডলী।", icon: "📝", rating: 4.7, reviews: 189, phone: "০১৭৫৫-৪৫৬৭৮৯", web: "rajshahicoaching.com", email: "", hours: "বিকাল ৩টা - রাত ৮টা", verified: true, featured: true, premium: false, open: true, tags: ["এসএসসি", "এইচএসসি"], lat: 24.4062, lng: 88.5751
  },
  {
    id: 12, name: "টমি মিয়া'স ইনস্টিটিউট", cat: "শিক্ষা", catLabel: "হসপিটালিটি", div: "সিলেট", district: "সিলেট সদর", area: "উপশহর", addr: "শাহজালাল উপশহর, সিলেট",
    desc: "হোটেল ম্যানেজমেন্ট এবং রন্ধনশিল্পের উপর প্রফেশনাল কারিগরি শিক্ষা প্রদান।", icon: "👨‍🍳", rating: 4.6, reviews: 130, phone: "০১৭৮৯-৪৫৬১২৩", web: "tommymiah.com", email: "info@tommymiah.com", hours: "সকাল ৯টা - বিকাল ৫টা", verified: true, featured: false, premium: false, open: true, tags: ["কুকিং", "ম্যানেজমেন্ট"], lat: 24.9225, lng: 91.8944
  },
  {
    id: 13, name: "ঢাকা বিশ্ববিদ্যালয় (DU)", cat: "শিক্ষা", catLabel: "বিশ্ববিদ্যালয়", div: "ঢাকা", district: "ঢাকা সদর", area: "শাহবাগ", addr: "নীলক্ষেত રોડ, শাহবাগ, ঢাকা",
    desc: "বাংলাদেশের প্রাচ্যের অক্সফোর্ড খ্যাত সর্ববৃহৎ এবং প্রাচীনতম পাবলিক বিশ্ববিদ্যালয়।", icon: "🏛️", rating: 4.9, reviews: 15400, phone: "০২-৯৬৬১৯০০", web: "du.ac.bd", email: "", hours: "সকাল ৮টা - বিকাল ৪টা", verified: true, featured: true, premium: true, open: true, tags: ["পাবলিক", "উচ্চশিক্ষা"], lat: 23.7712, lng: 90.3893
  },

  // ==================== ৪. আইটি (IT) ====================
  {
    id: 14, name: "প্রোগ্রামিং হিরো", cat: "আইটি", catLabel: "ট্রেইনিং সেন্টার", div: "ঢাকা", district: "ঢাকা সদর", area: "বনানী", addr: "হাউজ ৪, রোড ১১, বনানী, ঢাকা",
    desc: "সেরা আইটি ট্রেইনিং এবং ওয়েব ডেভেলপমেন্ট কোর্স। প্রজেক্ট-বেজড লার্নিং।", icon: "💻", rating: 4.8, reviews: 850, phone: "০১৭৭৭-৪৪খখ২২", web: "web.programming-hero.com", email: "web@programming-hero.com", hours: "অনলাইন ২৪/৭", verified: true, featured: false, premium: true, open: true, tags: ["কোডিং", "ট্রেইনিং"], lat: 23.7338, lng: 90.3403
  },
  {
    id: 15, name: "ব্রেইনস্টেশন ২৩", cat: "আইটি", catLabel: "সফটওয়্যার কোম্পানি", div: "ঢাকা", district: "ঢাকা সদর", area: "মহাখালী", addr: "মহাখালী ডিওএইচএস, ঢাকা",
    desc: "শীর্ষস্থানীয় গ্লোবাল সফটওয়্যার ডেভেলপমেন্ট ও আইটি সলিউশন কোম্পানি।", icon: "🏢", rating: 4.7, reviews: 120, phone: "০১৭০৩-১১২১৮৮", web: "brainstation-23.com", email: "sales@brainstation-23.com", hours: "সকাল ১০টা - সন্ধ্যা ৭টা", verified: true, featured: true, premium: false, open: true, tags: ["সফটওয়্যার", "ক্লাউড"], lat: 23.7520, lng: 90.3985
  },
  {
    id: 16, name: "নর্দান আইটি সলিউশন", cat: "আইটি", catLabel: "ফার্ম", div: "রংপুর", district: "দিনাজপুর", area: "বালুবাড়ী", addr: "বালুবাড়ী, দিনাজপুর",
    desc: "স্থানীয় ব্যবসা প্রতিষ্ঠানের জন্য ইআরপি ও POS সফটওয়্যার সরবরাহকারী।", icon: "⚙️", rating: 4.7, reviews: 40, phone: "০১৫৫৫-৮৮৮৯৯৯", web: "northernit.net", email: "", hours: "সকাল ৯টা - সন্ধ্যা ৬টা", verified: false, featured: false, premium: false, open: false, tags: ["POS", "ERP"], lat: 25.7412, lng: 89.3038
  },
  {
    id: 17, name: "ক্রিয়েটিভ আইটি ইনস্টিটিউট", cat: "আইটি", catLabel: "ইনস্টিটিউট", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", addr: "মমতাজ প্লাজা, ধানমন্ডি, ঢাকা",
    desc: "বাংলাদেশের ওয়ান অফ দ্য বেস্ট আইটি ট্রেনিং ইন্সটিটিউট। ফ্রিল্যান্সিং এবং আইটি স্কিল ডেভেলপমেন্ট।", icon: "💻", rating: 4.8, reviews: 4500, phone: "০১৬২৪-৬৬৬৪৪৪", web: "creativeitinstitute.com", email: "", hours: "সকাল ৯টা - রাত ৮টা", verified: true, featured: true, premium: true, open: true, tags: ["গ্রাফিক্স", "ওয়েব ডেভেলপমেন্ট", "ডিজিটাল মার্কেটিং"], lat: 23.7576, lng: 90.3697
  },

  // ==================== ৫. ফ্রিল্যান্সিং (Freelancing) ====================
  {
    id: 18, name: "ইভ্যালুয়েশন আইটি", cat: "ফ্রিল্যান্সিং", catLabel: "এজেন্সি", div: "ময়মনসিংহ", district: "ময়মনসিংহ সদর", area: "চরপাড়া", addr: "চরপাড়া মোড়, ময়মনসিংহ",
    desc: "আমরা গ্রাফিক্স ডিজাইন, এসইও এবং ডেটা এন্ট্রির সেরা ফ্রিল্যান্স সার্ভিস দিয়ে থাকি।", icon: "🎨", rating: 4.6, reviews: 90, phone: "০১৭৩৩-৯৯৮৮৭৭", web: "evaluationit.com", email: "", hours: "সকাল ৯টা - রাত ১১টা", verified: true, featured: false, premium: false, open: true, tags: ["গ্রাফিক্স", "এসইও"], lat: 24.7215, lng: 90.4151
  },
  {
    id: 19, name: "কোডারট্রাস্ট বাংলাদেশ", cat: "ফ্রিল্যান্সিং", catLabel: "ট্রেইনিং", div: "ঢাকা", district: "ঢাকা সদর", area: "বনানী", addr: "হাউজ ৮২, ব্লক ই, বনানী, ঢাকা",
    desc: "ফ্রিল্যান্সিং ক্যারিয়ার গড়ার জন্য স্কিল ডেভেলপমেন্ট ট্রেইনিং প্রোভাইডার।", icon: "💻", rating: 4.5, reviews: 450, phone: "০১৭৮৭-৬৫৪৩২১", web: "codertrustbd.com", email: "", hours: "সকাল ৯টা - সন্ধ্যা ৬টা", verified: true, featured: true, premium: true, open: true, tags: ["ট্রেইনিং", "ফ্রিল্যান্সার"], lat: 23.7547, lng: 90.3889
  },
  {
    id: 20, name: "খুলনা এসইও এক্সপার্টস", cat: "ফ্রিল্যান্সিং", catLabel: "এজেন্সি", div: "খুলনা", district: "খুলনা সদর", area: "বয়রা", addr: "বয়রা বাজার, খুলনা",
    desc: "ছোট ও মাঝারি ব্যবসায়ের জন্য এসইও এবং গুগল র‍্যাংকিং সার্ভিস।", icon: "📈", rating: 4.9, reviews: 22, phone: "০১৭৪৪-৫৫৫৬৬৬", web: "khulnaseo.com", email: "", hours: "অনলাইন ২৪/৭", verified: false, featured: false, premium: false, open: true, tags: ["এসইও", "লোকাল গাইড"], lat: 22.8747, lng: 89.5577
  },

  // ==================== ৬. কোম্পানি (Company) ====================
  {
    id: 21, name: "দারাজ বাংলাদেশ", cat: "কোম্পানি", catLabel: "ই-কমার্স", div: "ঢাকা", district: "ঢাকা সদর", area: "তেজগাঁও", addr: "উডল্যান্ড সেন্টার, তেজগাঁও শিল্প এলাকা, ঢাকা",
    desc: "বাংলাদেশের সবচেয়ে বড় ই-কমার্স প্ল্যাটফর্ম। দ্রুত হোম ডেলিভারি ও অরিজিনাল পণ্য।", icon: "🛒", rating: 4.1, reviews: 90050, phone: "১৬৪৯২", web: "daraz.com.bd", email: "", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: true, premium: true, open: true, tags: ["ই-কমার্স", "ডেলিভারি"], lat: 23.7253, lng: 90.4149
  },
  {
    id: 22, name: "প্রাণ-আরএফএল গ্রুপ", cat: "কোম্পানি", catLabel: "কর্পোরেট অফিস", div: "ঢাকা", district: "ঢাকা সদর", area: "বাড্ডা", addr: "প্রাণ সেন্টার, ১০৫ প্রগতি সরণি, বাড্ডা, ঢাকা",
    desc: "বাংলাদেশের অন্যতম বৃহত্তর খাদ্যদ্রব্য এবং প্লাস্টিক প্রস্তুতকারক কোম্পানি।", icon: "🏢", rating: 4.4, reviews: 3200, phone: "০৯৬১৩-৭৩৭১২", web: "pranfoods.net", email: "", hours: "সকাল ৯টা - বিকাল ৫টা", verified: true, featured: true, premium: false, open: true, tags: ["এফএমসিজি", "কর্পোরেট"], lat: 23.7370, lng: 90.3703
  },
  {
    id: 23, name: "রবি আজিয়াটা লিমিটেড", cat: "কোম্পানি", catLabel: "টেলিকম", div: "ঢাকা", district: "ঢাকা সদর", area: "গুলশান", addr: "রবি কর্পোরেট অফিস, গুলশান ১, ঢাকা",
    desc: "দেশের অন্যতম বৃহৎ টেলিকম অপারেটর এবং ডিজিটাল সার্ভিস প্রোভাইডার।", icon: "📱", rating: 4.3, reviews: 5400, phone: "১২১", web: "robi.com.bd", email: "", hours: "সকাল ৯টা - সন্ধ্যা ৬টা", verified: true, featured: false, premium: true, open: true, tags: ["টেলিকম", "কর্পোরেট"], lat: 23.7816, lng: 90.3483
  },

  // ==================== ৭. ছোট ব্যবসা (Small Biz) ====================
  {
    id: 24, name: "বসুন্ধরা সিটি শপিং কমপ্লেক্স", cat: "ছোট ব্যবসা", catLabel: "শপিং মল", div: "ঢাকা", district: "ঢাকা সদর", area: "পান্থপথ", addr: "পান্থপথ, ঢাকা ১২১৫",
    desc: "দেশের অন্যতম বৃহৎ শপিং মল। হাজারো ব্র‍্যান্ডের দোকান নিয়ে গঠিত।", icon: "🛍", rating: 4.5, reviews: 2100, phone: "০২-৯১১১৪৪০", web: "bashundharacity.com", email: "", hours: "সকাল ১০টা - রাত ৮টা", verified: true, featured: true, premium: true, open: true, tags: ["শপিং", "সিনেমা"], lat: 23.7658, lng: 90.3699
  },
  {
    id: 25, name: "আহমেদ টিম্বারস", cat: "ছোট ব্যবসা", catLabel: "কাঠের দোকান", div: "খুলনা", district: "খুলনা সদর", area: "ডাকবাংলো", addr: "ডাকবাংলো মোড়, খুলনা",
    desc: "উন্নত মানের সেগুন, মেহগনি এবং অন্যান্য কাঠ খুচরা ও পাইকারি পাওয়া যায়।", icon: "🪵", rating: 4.1, reviews: 65, phone: "০১৫৫৫-৬৬৬৭৭৭", web: "", email: "", hours: "সকাল ৮টা - রাত ৮টা", verified: false, featured: false, premium: false, open: true, tags: ["কাঠ", "পাইকারি"], lat: 22.8295, lng: 89.5446
  },
  {
    id: 26, name: "মায়ের দোয়া ইলেকট্রনিক্স", cat: "ছোট ব্যবসা", catLabel: "ইলেকট্রনিক্স দোকান", div: "বরিশাল", district: "বরিশাল সদর", area: "চকবাজার", addr: "চকবাজার, বরিশাল",
    desc: "ল্যাপটপ, মোবাইল এবং গ্যাজেট মেরামতের নির্ভরযোগ্য সার্ভিস পয়েন্ট।", icon: "🔌", rating: 4.0, reviews: 45, phone: "০১৯১১-২২৩৩৪৪", web: "", email: "", hours: "সকাল ১০টা - সন্ধ্যা ৮টা", verified: false, featured: false, premium: false, open: true, tags: ["গ্যাজেট", "রিপেয়ার"], lat: 22.7234, lng: 90.3157
  },

  // ==================== ৮. পরিবহন (Transport) ====================
  {
    id: 27, name: "পাঠাও লিমিটেড", cat: "পরিবহন", catLabel: "রাইড শেয়ারিং", div: "ঢাকা", district: "ঢাকা সদর", area: "গুলশান", addr: "রোড ২৯, হাউজ ২, গুলশান-১, ঢাকা",
    desc: "জনপ্রিয় রাইড শেয়ারিং, ফুড ডেলিভারি এবং পার্সেল সার্ভিস।", icon: "🛵", rating: 4.2, reviews: 3100, phone: "০৯৬১০-০৯৬১০", web: "pathao.com", email: "support@pathao.com", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: false, premium: false, open: true, tags: ["রাইড", "ডেলিভারি"], lat: 23.7394, lng: 90.4168
  },
  {
    id: 28, name: "শ্যামলী এন আর ট্রাভেলস", cat: "পরিবহন", catLabel: "বাস সার্ভিস", div: "ঢাকা", district: "ঢাকা সদর", area: "কল্যাণপুর", addr: "কল্যাণপুর বাস স্ট্যান্ড, ঢাকা",
    desc: "সারা বাংলাদেশে নিরাপদ এবং আরামদায়ক এসি/নন-এসি বাস সার্ভিস।", icon: "🚍", rating: 4.3, reviews: 1200, phone: "০১৭৩৩-৪৪৩৩২২", web: "shyamolitickets.com", email: "", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: true, premium: false, open: true, tags: ["এসি বাস", "টিকেট"], lat: 23.7193, lng: 90.4027
  },
  {
    id: 29, name: "উবার বাংলাদেশ", cat: "পরিবহন", catLabel: "রাইড শেয়ারিং", div: "ঢাকা", district: "ঢাকা সদর", area: "বনানী", addr: "বনানী, ঢাকা",
    desc: "বিশ্বের জনপ্রিয়তম রাইড এবং টেক্সি সার্ভিস প্রোভাইডার।", icon: "🚕", rating: 4.4, reviews: 5600, phone: "অ্যাপ মাধ্যমে", web: "uber.com/bd/en", email: "", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: false, premium: true, open: true, tags: ["উবার", "কার রেন্টাল"], lat: 23.7606, lng: 90.3651
  },

  // ==================== ৯. আবাসন (Accommodation) ====================
  {
    id: 30, name: "গ্রিন ভ্যালি রিসোর্ট", cat: "আবাসন", catLabel: "রিসোর্ট", div: "সিলেট", district: "সিলেট সদর", area: "খাদিমনগর", addr: "খাদিমনগর, সিলেট-তামাবিল রোড, সিলেট",
    desc: "চা বাগান এবং প্রকৃতির কোলে গড়ে ওঠা একটি শান্তিময় রিসোর্ট। ফ্যামিলি ট্যুরের জন্য দুর্দান্ত।", icon: "🏨", rating: 4.4, reviews: 320, phone: "০১৮৮৮-০০০৯৯৯", web: "greenvalley.com", email: "", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: false, premium: true, open: true, tags: ["রিসোর্ট", "ট্যুর"], lat: 24.9098, lng: 91.8573
  },
  {
    id: 31, name: "হোটেল র্যাডিসন ব্লু ওয়াটার গার্ডেন", cat: "আবাসন", catLabel: "হোটেল", div: "ঢাকা", district: "ঢাকা সদর", area: "ক্যান্টনমেন্ট", addr: "এয়ারপোর্ট রোড, ক্যান্টনমেন্ট, ঢাকা",
    desc: "আন্তর্জাতিক ৫-তারা মানের হোটেল। অসাধারণ আতিথেয়তা ও বিলাসবহুল রুম।", icon: "🛏️", rating: 4.8, reviews: 8500, phone: "০২-৯৮৩৪৫৫৫", web: "radissonhotels.com", email: "", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: true, premium: true, open: true, tags: ["ফাইভ স্টার", "লাক্সারি"], lat: 23.7771, lng: 90.4043
  },
  {
    id: 32, name: "লং বিচ হোটেল", cat: "আবাসন", catLabel: "হোটেল", div: "চট্টগ্রাম", district: "কক্সবাজার", area: "কলাতলী", addr: "কলাতলী রোড, কক্সবাজার",
    desc: "বাংলাদেশের দীর্ঘতম সমুদ্রসৈকতের পাশে অবস্থিত অত্যন্ত বিলাসবহুল ৫-তারা মানের হোটেল।", icon: "🏖️", rating: 4.6, reviews: 4200, phone: "০১৮১৯-২২২২২২", web: "longbeachhotelbd.com", email: "", hours: "২৪ ঘণ্টা খোলা", verified: true, featured: true, premium: false, open: true, tags: ["হোটেল", "সমুদ্রসৈকত"], lat: 22.3243, lng: 91.7506
  },

  // ==================== ১০. ফ্যাশন (Fashion) ====================
  {
    id: 33, name: "আড়ং", cat: "ফ্যাশন", catLabel: "বুটিক", div: "ঢাকা", district: "ঢাকা সদর", area: "ধানমন্ডি", addr: "বাড়ি ১, রোড ২, মিরপুর রোড, ধানমন্ডি, ঢাকা",
    desc: "ঐতিহ্যবাহী বাংলাদেশি পোশাক ও হস্তশিল্পের নির্ভরযোগ্য প্রতিষ্ঠান। দেশীয় কারিগরদের তৈরি সেরা পণ্য।", icon: "👗", rating: 4.9, reviews: 4500, phone: "০৯৬১১-২২৩৪৩৪", web: "aarong.com", email: "", hours: "সকাল ১০টা - রাত ৮টা", verified: true, featured: true, premium: true, open: true, tags: ["পোশাক", "ব্র্যাক"], lat: 23.7750, lng: 90.3552
  },
  {
    id: 34, name: "সেইলর (Sailor)", cat: "ফ্যাশন", catLabel: "ক্লোথিং ব্র্যান্ড", div: "ঢাকা", district: "ঢাকা সদর", area: "যমুনা ফিউচার পার্ক", addr: "যমুনা ফিউচার পার্ক, লেভেল ১",
    desc: "দেশের অন্যতম জনপ্রিয় প্রিমিয়াম ফ্যাশন লাইফস্টাইল ব্র্যান্ড। নারী ও পুরুষদের সেরা কালেকশন।", icon: "👔", rating: 4.7, reviews: 850, phone: "০১৭৩৩-৯৯৯৯৯৯", web: "sailor.clothing", email: "", hours: "সকাল ১০টা - রাত ৮টা", verified: true, featured: false, premium: true, open: true, tags: ["লাইফস্টাইল", "পোশাক"], lat: 23.7486, lng: 90.3720
  },
  {
    id: 35, name: "ইলোরা জুয়েলার্স", cat: "ফ্যাশন", catLabel: "জুয়েলারি", div: "চট্টগ্রাম", district: "চট্টগ্রাম সদর", area: "নিউ মার্কেট", addr: "বিপণী বিতান (নিউ মার্কেট), চট্টগ্রাম",
    desc: "বিশ্বস্ত স্বর্ণ, ডায়মন্ড ও রূপার গহনা নির্মাতা। ২২ ক্যারেট হলমার্ককৃত স্বর্ণের নিশ্চয়তা।", icon: "💍", rating: 4.4, reviews: 310, phone: "০৩১-৬৬৬৯৯৯", web: "ellorajewellers.com", email: "", hours: "সকাল ১১টা - রাত ৯টা", verified: true, featured: false, premium: false, open: true, tags: ["স্বর্ণ", "গহনা"], lat: 22.3817, lng: 91.7417
  },

  // ==================== ১১. কৃষি (Agri) ====================
  {
    id: 36, name: "সবুজ বীজ ভান্ডার", cat: "কৃষি", catLabel: "বীজ ভান্ডার", div: "রংপুর", district: "রংপুর সদর", area: "পায়রা চত্বর", addr: "পায়রা চত্বর, রংপুর",
    desc: "উন্নত মানের ধান, গম ও সবজির বীজ এবং সার-কীটনাশক সরবরাহকারী। কৃষকের বিশ্বস্ত বন্ধু।", icon: "🌾", rating: 4.3, reviews: 230, phone: "০১৮১১-২২৩৩৪৪", web: "", email: "", hours: "সকাল ৭টা - সন্ধ্যা ৬টা", verified: false, featured: false, premium: false, open: true, tags: ["বীজ", "সার"], lat: 25.7244, lng: 89.2489
  },
  {
    id: 37, name: "আধুনিক কৃষি খামার লিমিটেড", cat: "কৃষি", catLabel: "খামার", div: "রাজশাহী", district: "বগুড়া", area: "শেরপুর", addr: "শেরপুর হাইওয়ে, বগুড়া",
    desc: "বিষমুক্ত শাকসবজি এবং উন্নত জাতের গাভী পালন। পাইকারি সবজি সরবরাহ করা হয়।", icon: "🚜", rating: 4.6, reviews: 85, phone: "০১৭৩৩-১১২২৮৮", web: "", email: "", hours: "সকাল ৬টা - বিকাল ৫টা", verified: true, featured: true, premium: false, open: true, tags: ["অর্গানিক", "ডেইরি"], lat: 24.3350, lng: 88.6248
  },
  {
    id: 38, name: "এসিআই এগ্রিবিজনেস", cat: "কৃষি", catLabel: "কর্পোরেট সাপ্লায়ার", div: "ঢাকা", district: "ঢাকা সদর", area: "তেজগাঁও", addr: "এসিআই সেন্টার, ২৪৫ তেজগাঁও, ঢাকা",
    desc: "বাংলাদেশের কৃষিক্ষেত্রে আধুনিকায়ন এবং কৃষকদের সেরা বীজ ও কীটনাশক প্রদানে अग्रणी।", icon: "🌱", rating: 4.8, reviews: 1100, phone: "০২-৯৮৮৫৬৭৩", web: "aciagribusiness.com", email: "", hours: "সকাল ৯টা - বিকাল ৫টা", verified: true, featured: true, premium: true, open: true, tags: ["বীজ", "কীটনাশক"], lat: 23.7224, lng: 90.3952
  }
];
