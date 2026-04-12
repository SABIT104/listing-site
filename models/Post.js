const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String },
  excerpt: { type: String, maxLength: 160 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['draft','published','scheduled'], default: 'draft' },
  publishAt: { type: Date },
  categories: [{ type: String }],
  tags: [{ type: String }],
  featuredImage: { type: String },
  imageAlt: { type: String },
  seoTitle: { type: String, maxLength: 60 },
  seoDescription: { type: String, maxLength: 160 },
  ogTitle: { type: String },
  ogDescription: { type: String },
  ogImage: { type: String },
  canonicalUrl: { type: String },
  focusKeyword: { type: String },
  schemaType: { type: String, enum: ['Article','BlogPosting','HowTo','FAQ'], default: 'Article' },
  schemaData: { type: Object },
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
