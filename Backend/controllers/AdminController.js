import Admin from '../models/AdminSchema.js';
import Therapist from "../models/TherapistSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// ==============adminlogin=====================

export async function loginAdmin(req, res) {
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


// ========Get Admin==========
export async function getAdmin(req, res) {
    try {
        const { adminId } = req.params;

        const admin = await Admin.findById(adminId).select('-password');

        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.status(200).json(admin);

    } catch (err) {
        res.satus(500).json({ error: 'Failed to fetch admin' });
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

// export async function loginAdmin(req, res) {
//     try {
//         const { email, password } = req.body;

//         const admin = await Admin.findOne({ email });
//         if (!admin || admin.role !== 'admin') {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ adminId: admin._id, role: admin.role }, process.env.JWT_TOKEN, { expiresIn: "24h" });
//         console.log(token);
//         res.status(200).json({ token, role: admin.role });


//     } catch (err) {
//         console.error('Admin login error:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// }


//  -----------------------------------------------
// |=================Manage Therapists============ |
//  -----------------------------------------------

// ==========Get all Therapists ================
export async function getAllTherapists(req, res) {
    try {
        const { status } = req.query;
        const filter = {};

        if (status) filter.isApproved = status;

        const therapists = await Therapist.find(filter).select('-password -otp -otpExpires -__v').sort({ createdAt: -1 });

        if (!therapists.length) {
            return res.status(200).json({
                success: true, message: 'No therapist application found', data: [],
            });
        }

        res.status(200).json({
            success: true,
            total: therapists.length,
            data: therapists,
        });
    } catch (err) {
        console.error('Error fetching therapists:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching therapists',
        });
    }
}


// ========get single therapist===============
export async function getTherapist(req, res) {
    try {
        const { id } = req.params;
        const therapist = await Therapist.findById(id).select("-password -otp -otpExpires");

        if (!therapist) {
            return res.status(404).json({ error: "Therapist not found" });
        }

        res.status(200).json(therapist);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch therapist" });
    }
}



// ===============approve or reject therapist application====================
export async function updateTherapistStatus(req, res) {
    try {
        const { id } = req.params;
        const { isApproved, adminNotes } = req.body;

        if (!["pending", 'approved', 'rejected'].includes(isApproved)) {
            return res.status(400).json({ error: "invalid status value" });
        }

        const updateTherapist = await Therapist.findByIdAndUpdate(id, { isApproved, adminNotes }, { new: true }).select("-password -otp -otpExpires");

        if (!updateTherapist) {
            return res.status(404).json({ error: "Therapist not found" });
        }

        res.status(200).json(updateTherapist);
    } catch (err) {
        console.error("Error updating therapist status:", err);
        res.status(500).json({ error: "Failed to update status" });
    }
}


// ======== disable/freez therapist accounts===========
export async function disableAccount(req, res) {
    try {
        const { id } = req.params;
        const { isActive, adminNotes } = req.body;

        const updatedTherapist = await Therapist.findByIdAndUpdate(
            id,
            {
                isActive,
                adminNotes: adminNotes || (isActive ? "Account enabled by admin" : "Account disabled by admin")
            },
            { new: true }
        ).select("-password -otp -otpExpires");

        if (!updatedTherapist) {
            return res.status(404).json({ error: "Therapist not found" });
        }

        res.status(200).json({
            message: `Therapist account has been ${isActive ? "enabled" : "disabled"} successfully`,
            therapist: updatedTherapist
        });
    } catch (err) {
        console.error("Toggle therapist account error:", err);
        res.status(500).json({ error: "Server error" });
    }
}