import Admin from '../models/AdminSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// ==============adminlogin=====================

export async function loginSuperadmin(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_TOKEN, { expiresIn: "24h" });
        console.log(token);

        res.status(200).json({ token, role: admin.role });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}


// ============create admin=================
export async function createAdmin(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: "Admin already exists" });
        }

        const newAdmin = new Admin({
            name, email, password, role: role || 'admin',
        });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (err) {
        console.error('Create admin error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}


// =================Get all admins===========
export async function getAllAdmin(req, res) {
    try {
        const admins = await Admin.find({ role: 'admin' }).select('-password');
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
}



// ==============Edit Admin===============
export async function updateAdmin(req, res) {
    try {
        const { adminId } = req.params;
        console.log(adminId);
        const { name, email, role } = req.body;

        const updated = await Admin.findByIdAndUpdate(adminId, { name, email, role }, { new: true });
        res.status(200).json(updated);

    } catch (err) {
        res.status(500).json({ error: 'failed to update admin' });
    }
};



// ==============Delete Admin=================
export async function deleteAdmin(req, res) {
    try {
        const { adminId } = req.params;
        await Admin.findByIdAndDelete(adminId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete admin' });
    }
};


// ==========Admin Login================

export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin || admin.role !== 'admin') {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_TOKEN, { expiresIn: "24h" });
        console.log(token);
        res.status(200).json({ token, role: admin.role });


    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}