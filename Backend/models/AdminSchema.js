import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";


const adminSchema = new mongoose.Schema({
     name : {type: String, required: true, trim: true},
     email: {type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, "Invalid email format"]},
     password: {type: String, required: true},
     role: {type: String, enum: ['admin', 'superadmin'], default: 'admin'},
     createdAt: {type: Date, default: Date.now}

    }); 
    //  Hash password before saving
    adminSchema.pre('save',async function(next){
        if(!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });

    const Admin = mongoose.model('Admin', adminSchema);
    export default Admin;