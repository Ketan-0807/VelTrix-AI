import { clerkClient } from '@clerk/express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware wrapper for multer
const handleMulterUpload = (req, res, next) => {
  upload.single('profileImage')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err.message });
    }
    next();
  });
};

export const updateUser = async (req, res) => {
  try {
    const { userId, firstName, lastName } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    console.log('Update request received for user:', userId);
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    const updatedData = {};
    if (firstName) updatedData.first_name = firstName;
    if (lastName) updatedData.last_name = lastName;

    // Update user details
    if (Object.keys(updatedData).length > 0) {
      console.log('Updating user data:', updatedData);
      await clerkClient.users.updateUser(userId, updatedData);
    }

    // Update profile image if provided
    if (req.file) {
      console.log('Updating profile image with file:', req.file.path);
      const imageBuffer = fs.readFileSync(req.file.path);
      await clerkClient.users.updateUserProfileImage(userId, {
        file: imageBuffer
      });
      
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// Export middleware and controller
export const userUpdateMiddleware = handleMulterUpload;