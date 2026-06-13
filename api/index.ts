import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { Schema, Document } from 'mongoose';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Database schema
export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

// Connection state
let isMongoConnected = false;
const MONGODB_URI = process.env.MONGODB_URI;

const localDataDir = '/tmp';
const localDataFile = path.join(localDataDir, 'enquiries.json');

// Ensure local storage directory exists
if (!fs.existsSync(localDataDir)) {
  fs.mkdirSync(localDataDir, { recursive: true });
}
if (!fs.existsSync(localDataFile)) {
  fs.writeFileSync(localDataFile, JSON.stringify([], null, 2), 'utf-8');
}

// Connect to MongoDB if URI is present
const connectDB = async () => {
  if (isMongoConnected) return true;
  if (!MONGODB_URI) return false;

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
    isMongoConnected = true;
    return true;
  } catch (err: any) {
    console.warn('MongoDB connection failed in Vercel function. Using local storage fallback.', err.message);
    return false;
  }
};

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

// Endpoint
app.post('/api/enquiry', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;

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

    const hasMongo = await connectDB();
    let savedData;

    if (hasMongo) {
      const newEnquiry = new Enquiry(cleanedData);
      savedData = await newEnquiry.save();
      console.log('Saved enquiry to MongoDB:', savedData._id);
    } else {
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
      storage: hasMongo ? 'mongodb' : 'local_json',
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

export default app;
