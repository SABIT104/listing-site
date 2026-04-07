const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Local JSON Database ────────────────────────────────────────────────────

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
const DB_PATH = path.join(DATA_DIR, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], listings: [], blogs: [], categories: [], reviews: [] }, null, 2), 'utf8');
}

function readDB() {
  try {
    const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    if (!db.blogs) db.blogs = [];
    if (!db.categories) db.categories = [
      { _id: 'cat1', name: 'খাবার', icon: '🍛' },
      { _id: 'cat2', name: 'স্বাস্থ্য', icon: '🏥' },
      { _id: 'cat3', name: 'শিক্ষা', icon: '📚' }
    ];
    if (!db.reviews) db.reviews = [];
    return db;
  } catch {
    return { users: [], listings: [], blogs: [], categories: [], reviews: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function newId() {
  return crypto.randomBytes(12).toString('hex');
}

console.log('✅ Using local JSON database at: data/db.json');

// ─── Middleware ─────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOADS_DIR));

// ─── Multer Config ────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
  }
});
const upload = multer({ storage });

// ─── API ROUTES ─────────────────────────────────────────────────────────────

// 1. Register
app.post('/api/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'সব তথ্য প্রদান করুন।' });

    const db = readDB();
    const existing = db.users.find(u => u.email === email);
    if (existing)
      return res.status(400).json({ success: false, message: 'এই ইমেইলটি ইতিপূর্বে ব্যবহৃত হয়েছে।' });

    const user = { _id: newId(), name, email, password, registeredAt: new Date().toISOString() };
    db.users.push(user);
    writeDB(db);

    res.status(201).json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি!' });
  }
});

// 2. Login
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email && u.password === password);
    if (!user)
      return res.status(401).json({ success: false, message: 'ভুল ইমেইল অথবা পাসওয়ার্ড!' });

    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি!' });
  }
});

// 3. Admin Login
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const adminUser = process.env.ADMIN_USER || 's@bit';
    const adminPass = process.env.ADMIN_PASS || 's@bit104';
    if (email === adminUser && password === adminPass) {
      return res.json({ success: true, admin: true, name: 'Admin' });
    }
    res.status(401).json({ success: false, message: 'ভুল অ্যাডমিন ক্রেডেনশিয়াল!' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি!' });
  }
});

// 4. Create Listing
app.post('/api/listings', (req, res) => {
  try {
    const db = readDB();
    const listing = {
      _id: newId(),
      userId: req.body.userId || '',
      name: req.body.name || '',
      category: req.body.category || '',
      area: req.body.area || '',
      district: req.body.district || '',
      division: req.body.division || '',
      phone: req.body.phone || '',
      description: req.body.description || '',
      icon: req.body.icon || '🏢',
      rating: req.body.rating || 0,
      reviews: req.body.reviews || 0,
      verified: req.body.verified || false,
      featured: req.body.featured || false,
      premium: req.body.premium || false,
      isLive: req.body.isLive || false,
      views: req.body.views || 0,
      createdAt: new Date().toISOString()
    };
    db.listings.push(listing);
    writeDB(db);
    res.status(201).json({ success: true, listing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'লিস্টিং সেভ করতে সমস্যা হয়েছে।' });
  }
});

// 5. Get User Listings
app.get('/api/listings/user/:userId', (req, res) => {
  try {
    const db = readDB();
    const listings = db.listings
      .filter(l => l.userId === req.params.userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 6. Get All Approved Listings (with multi-field search)
app.get('/api/listings', (req, res) => {
  try {
    const db = readDB();
    let listings = db.listings.filter(l => l.isLive === true);

    if (req.query.category) {
      listings = listings.filter(l => l.category === req.query.category);
    }

    if (req.query.division) {
      listings = listings.filter(l => l.division === req.query.division);
    }

    if (req.query.q) {
      const q = req.query.q.toLowerCase().trim();
      listings = listings.filter(l =>
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.category && l.category.toLowerCase().includes(q)) ||
        (l.area && l.area.toLowerCase().includes(q)) ||
        (l.district && l.district.toLowerCase().includes(q)) ||
        (l.description && l.description.toLowerCase().includes(q)) ||
        (l.tags && l.tags.toLowerCase().includes(q))
      );
    }

    listings.sort((a, b) => {
      // Featured/premium listings first, then by date
      if (b.featured !== a.featured) return b.featured ? 1 : -1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 7. Get All Listings (Admin)
app.get('/api/admin/listings', (req, res) => {
  try {
    const db = readDB();
    const listings = db.listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 8. Update Listing
app.put('/api/listings/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.listings.findIndex(l => l._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'লিস্টিং পাওয়া যায়নি।' });
    db.listings[idx] = { ...db.listings[idx], ...req.body, _id: req.params.id };
    writeDB(db);
    res.json({ success: true, listing: db.listings[idx] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 9. Delete Listing
app.delete('/api/listings/:id', (req, res) => {
  try {
    const db = readDB();
    const before = db.listings.length;
    db.listings = db.listings.filter(l => l._id !== req.params.id);
    if (db.listings.length === before)
      return res.status(404).json({ success: false, message: 'লিস্টিং পাওয়া যায়নি।' });
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 10. Get All Users (Admin)
app.get('/api/admin/users', (req, res) => {
  try {
    const db = readDB();
    const users = db.users.map(u => ({ id: u._id, name: u.name, email: u.email, registeredAt: u.registeredAt }));
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 10.1 Update User Profile
app.put('/api/users/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.users.findIndex(u => u._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, message: 'ইউজার পাওয়া যায়নি!' });
    
    // Only update allowed fields
    if (req.body.name) db.users[idx].name = req.body.name;
    if (req.body.phone) db.users[idx].phone = req.body.phone;
    if (req.body.password) db.users[idx].password = req.body.password;
    
    writeDB(db);
    res.json({ success: true, user: { id: db.users[idx]._id, name: db.users[idx].name, email: db.users[idx].email } });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 10.2 Category APIs
app.get('/api/categories', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, categories: db.categories || [] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post('/api/categories', (req, res) => {
  try {
    const db = readDB();
    const cat = { _id: newId(), name: req.body.name || '', icon: req.body.icon || '📌' };
    db.categories.push(cat);
    writeDB(db);
    res.status(201).json({ success: true, category: cat });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.put('/api/categories/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.categories.findIndex(c => c._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false });
    db.categories[idx] = { ...db.categories[idx], ...req.body, _id: req.params.id };
    writeDB(db);
    res.json({ success: true, category: db.categories[idx] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.delete('/api/categories/:id', (req, res) => {
  try {
    const db = readDB();
    db.categories = db.categories.filter(c => c._id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 11. BLOG APIs
app.get('/api/blogs', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, blogs: db.blogs.sort((a,b) => new Date(b.date) - new Date(a.date)) });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post('/api/blogs', upload.single('image'), (req, res) => {
  try {
    const db = readDB();
    const blog = {
      _id: newId(),
      title: req.body.title || '',
      category: req.body.category || '',
      excerpt: req.body.excerpt || '',
      content: req.body.content || '',
      image: req.file ? `/uploads/${req.file.filename}` : (req.body.image || ''),
      icon: req.body.icon || '📝',
      date: new Date().toISOString(),
      views: 0
    };
    db.blogs.push(blog);
    writeDB(db);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.put('/api/blogs/:id', upload.single('image'), (req, res) => {
  try {
    const db = readDB();
    const idx = db.blogs.findIndex(b => b._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false });
    
    const update = { ...req.body };
    if (req.file) update.image = `/uploads/${req.file.filename}`;
    
    db.blogs[idx] = { ...db.blogs[idx], ...update, _id: req.params.id };
    writeDB(db);
    res.json({ success: true, blog: db.blogs[idx] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.delete('/api/blogs/:id', (req, res) => {
  try {
    const db = readDB();
    db.blogs = db.blogs.filter(b => b._id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 13. Review APIs
app.get('/api/reviews', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, reviews: db.reviews || [] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post('/api/reviews', (req, res) => {
  try {
    const db = readDB();
    const review = {
      _id: newId(),
      listingId: req.body.listingId,
      userId: req.body.userId,
      userName: req.body.userName,
      rating: req.body.rating || 5,
      comment: req.body.comment || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    db.reviews.push(review);
    writeDB(db);
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.put('/api/reviews/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.reviews.findIndex(r => r._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false });
    db.reviews[idx] = { ...db.reviews[idx], ...req.body, _id: req.params.id };
    writeDB(db);
    res.json({ success: true, review: db.reviews[idx] });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.delete('/api/reviews/:id', (req, res) => {
  try {
    const db = readDB();
    db.reviews = db.reviews.filter(r => r._id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 12. General Image Upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ success: true, url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ success: false });
  }
});

// ─── Serve Frontend ──────────────────────────────────────────────────────────

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.header('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BusinessBangla server running on http://127.0.0.1:${PORT}`);
  console.log(`📁 Data stored in: data/db.json`);
  console.log(`👤 Admin login: ${process.env.ADMIN_USER || 's@bit'} / ${process.env.ADMIN_PASS || 's@bit104'}`);
});
