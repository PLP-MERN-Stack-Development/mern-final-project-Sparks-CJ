const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, profile } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (profile) user.profile = { ...user.profile, ...profile };

    await user.save();

    res.json({
      message: "Profile updated",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) { next(err); }
};
