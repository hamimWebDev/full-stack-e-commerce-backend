import { Request, Response } from 'express';
import User from '../models/user.model';
import { Document, Types } from 'mongoose';
import { IUser } from '../models/user.model';
import { UnauthorizedError } from '../utils/errorHandler';

interface AuthRequest extends Omit<Request, 'user'> {
  user?: Document<Types.ObjectId> & IUser;
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('User not authenticated');
    }

    const { name, email, phoneNumber, address, profilePhoto } = req.body;

    // Check if email is being changed and if it's already taken
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Prepare update object
    const updateData: any = {
      name: name !== undefined ? name : req.user.name,
      email: email !== undefined ? email : req.user.email,
      phoneNumber: phoneNumber !== undefined ? phoneNumber : req.user.phoneNumber,
      address: address !== undefined ? address : req.user.address
    };

    // Handle profilePhoto separately to allow empty string
    if (profilePhoto !== undefined) {
      updateData.profilePhoto = profilePhoto;
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -__v');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
}; 