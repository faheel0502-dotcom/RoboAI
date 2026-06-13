import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Enquiry from './models/Enquiry';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ESM support for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Database connection state
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

const localDataDir = path.join(__dirname, 'data');
const localDataFile = path.join(localDataDir, 'enquiries.json');

// Ensure local storage directory exists
if (!fs.existsSync(localDataDir)) {
  fs.mkdirSync(localDataDir, { recursive: true });
}
if (!fs.existsSync(localDataFile)) {
  fs.writeFileSync(localDataFile, JSON.stringify([], null, 2), 'utf-8');
}

if (MONGODB_URI) {
  console.log('Attempting to connect to MongoDB...');
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB connected successfully.');
      isMongoConnected = true;
    })
    .catch((err) => {
      console.warn('MongoDB connection failed. Falling back to local JSON storage.', err.message);
    });
} else {
  console.log('MONGODB_URI not set. Running with local JSON storage fallback.');
}

// Validation function
const validateEnquiry = (name: string, email: string, phone: string) => {
  const errors: string[] = [];
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long.');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Please enter a valid email address.');
  }

  const phoneRegex = /^\+?[\d\s\-()]{10,15}$/;
  if (!phone || !phoneRegex.test(phone)) {
    errors.push('Please enter a valid phone number (10 to 15 digits).');
  }

  return errors;
};

// API Endpoint
app.post('/api/enquiry', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;

    // Validate fields
    const validationErrors = validateEnquiry(name, email, phone);
    if (validationErrors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors,
      });
      return;
    }

    const cleanedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      createdAt: new Date(),
    };

    let savedData;

    if (isMongoConnected) {
      // Save to MongoDB
      const newEnquiry = new Enquiry(cleanedData);
      savedData = await newEnquiry.save();
      console.log('Saved enquiry to MongoDB:', savedData._id);
    } else {
      // Fallback: Save to Local JSON
      const fileContent = fs.readFileSync(localDataFile, 'utf-8');
      const enquiries = JSON.parse(fileContent || '[]');
      
      const newEnquiryLocal = {
        id: new mongoose.Types.ObjectId().toString(),
        ...cleanedData,
      };
      
      enquiries.push(newEnquiryLocal);
      fs.writeFileSync(localDataFile, JSON.stringify(enquiries, null, 2), 'utf-8');
      savedData = newEnquiryLocal;
      console.log('Saved enquiry to local JSON file:', newEnquiryLocal.id);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your interest! We have received your enquiry and will get back to you shortly.',
      data: savedData,
      storage: isMongoConnected ? 'mongodb' : 'local_json',
    });
  } catch (error: any) {
    console.error('Error handling enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'An internal server error occurred. Please try again later.',
      error: error.message,
    });
  }
});

// Serve frontend static assets in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
