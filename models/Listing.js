const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  area: { type: String, required: true },
  district: { type: String, required: true },
  division: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String },
  icon: { type: String, default: '🏢' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  premium: { type: Boolean, default: false },
  isLive: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  seoTitle: { type: String },
  seoDescription: { type: String },
  ogImage: { type: String },
  canonicalUrl: { type: String },
  schemaMarkup: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', ListingSchema);
