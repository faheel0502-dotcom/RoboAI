// api/index.js  –  Plain CommonJS so Vercel Node.js runtime can run it directly
const express = require('express');
const cors = require('cors');

let mongoose;
let Enquiry;

// Lazy-require mongoose so a missing package doesn't crash the cold start
try {
  mongoose = require('mongoose');
  const EnquirySchema = new mongoose.Schema({
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, trim: true, lowercase: true },
    phone:     { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
  });
  Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
} catch (e) {
  console.warn('mongoose not available:', e.message);
}

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// ─── MongoDB lazy connection ────────────────────────────────────────────────
let mongoConnected = false;

async function connectDB() {
  if (!mongoose) return false;
  if (mongoConnected) return true;
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    }
    mongoConnected = mongoose.connection.readyState === 1;
    return mongoConnected;
  } catch (err) {
    console.warn('MongoDB connect failed, using in-memory fallback:', err.message);
    return false;
  }
}

// ─── In-memory fallback (works on Vercel – no filesystem writes needed) ────
const inMemoryStore = [];

// ─── Validation ─────────────────────────────────────────────────────────────
function validateEnquiry(name, email, phone) {
  const errors = [];
  if (!name || name.trim().length < 2)
    errors.push('Name must be at least 2 characters long.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('Please enter a valid email address.');
  if (!phone || !/^\+?[\d\s\-()]{10,15}$/.test(phone))
    errors.push('Please enter a valid phone number (10 to 15 digits).');
  return errors;
}

// ─── POST /api/enquiry ───────────────────────────────────────────────────────
app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, email, phone } = req.body || {};

    const errors = validateEnquiry(name, email, phone);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const cleaned = {
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      phone:     phone.trim(),
      createdAt: new Date(),
    };

    const hasMongo = await connectDB();
    let saved;

    if (hasMongo && Enquiry) {
      const doc = new Enquiry(cleaned);
      saved = await doc.save();
      console.log('Saved to MongoDB:', saved._id);
    } else {
      // Fallback: keep in memory for this function instance
      saved = { id: Date.now().toString(), ...cleaned };
      inMemoryStore.push(saved);
      console.log('Saved to in-memory store, total entries:', inMemoryStore.length);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for your interest! We will get back to you shortly.',
      storage: hasMongo ? 'mongodb' : 'memory',
    });
  } catch (err) {
    console.error('Enquiry handler error:', err);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred. Please try again later.',
      error: err.message,
    });
  }
});

// ─── Health-check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Vercel exports the app as a handler
module.exports = app;
