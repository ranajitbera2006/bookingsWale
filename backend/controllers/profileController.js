// controllers/profileController.js
import AdminProfile from "../models/AdminProfile.js";

// @desc    Get the current admin profile
// @route   GET /api/profile
export const getProfile = async (req, res, next) => {
  try {
    let profile = await AdminProfile.findOne();
    if (!profile) {
      profile = await AdminProfile.create({});
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

// @desc    Update the admin profile
// @route   PUT /api/profile
export const updateProfile = async (req, res, next) => {
  try {
    let profile = await AdminProfile.findOne();
    if (!profile) {
      profile = await AdminProfile.create(req.body);
    } else {
      profile = await AdminProfile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
