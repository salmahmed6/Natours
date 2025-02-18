import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    //console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debugging line

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment');
    }

    await mongoose.connect(uri);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};









export default connectDB;
