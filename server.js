const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

// Load environment variables
dotenv.config();

// Fix SRV resolution for MongoDB Atlas in restricted environments
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch (e) {}

const User = require('./models/User');
const Listing = require('./models/Listing');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 
})
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️ HINT: If you see a DNS SRV error, please provide the "Standard Connection String" (driver 2.2.12 or earlier) from MongoDB Atlas.');
  });

// --- API ROUTES ---

// 1. Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'এই ইমেইলটি ইতিপূর্বে ব্যবহৃত হয়েছে।' });
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ success: true, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি!' });
  }
});

// 2. Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ success: false, message: 'ভুল ইমেইল অথবা পাসওয়ার্ড!' });
    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'সার্ভার ত্রুটি!' });
  }
});

// 3. Create Listing
app.post('/api/listings', async (req, res) => {
  try {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.status(201).json({ success: true, listing: newListing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'লিস্টিং সেভ করতে সমস্যা হয়েছে।' });
  }
});

// 4. Get User Listings
app.get('/api/listings/user/:userId', async (req, res) => {
  try {
    const listings = await Listing.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 5. Get All Approved Listings
app.get('/api/listings', async (req, res) => {
  try {
    const query = req.query.category ? { category: req.query.category, isLive: true } : { isLive: true };
    const listings = await Listing.find(query).sort({ createdAt: -1 });
    res.json({ success: true, listings });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 6. Update Listing
app.put('/api/listings/:id', async (req, res) => {
  try {
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, listing: updated });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// 7. Delete Listing
app.delete('/api/listings/:id', async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Serve Frontend (index.html as root) - POSIX-compliant Catch-all
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.header('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BusinessBangla server active on http://127.0.0.1:${PORT}`);
});
