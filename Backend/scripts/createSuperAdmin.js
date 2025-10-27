import mongoose from "mongoose";
import dotenv from 'dotenv';
import Admin from '../models/AdminSchema.js';

dotenv.config();

const createSuperAdmin = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Online-Counseling-platform');

        const existing = await Admin.findOne({ email: 'shihadmurshi06@gmail.com' });
        if (existing) {
            console.log('SuperAdmin already exists');
            return mongoose.disconnect();
        }

        

        const superAdmin = new Admin({
            name: 'Super Admin',
            email: 'shihadmurshi06@gmail.com',
            password: 'SuperAdmin@123',
            role: 'superadmin'
        });
        await superAdmin.save();
        console.log('SuperAdmin created successfully');
        mongoose.disconnect();
    } catch (err) {
        console.error('Error creating SuperAdmin:', err.message);
        mongoose.disconnect();

    }
}

createSuperAdmin();
