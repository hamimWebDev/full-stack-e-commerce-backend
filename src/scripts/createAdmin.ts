import mongoose from 'mongoose';
import User from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const adminUser = {
      name: 'Md Hamim Howlader Asif',
      email: 'mdhamim@gmail.com',
      password: 'admin1234',
      role: 'admin',
      profilePhoto: 'https://profilephoto.com'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const user = await User.create(adminUser);
    console.log('Admin user created successfully:', user);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin(); 