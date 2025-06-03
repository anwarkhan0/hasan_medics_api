const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({ count: users.length, users });
};
