const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const signToken = (user) => jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });


exports.register = async (req, res, next) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
const existing = await User.findOne({ email });
if (existing) return res.status(409).json({ message: 'Email in use' });
const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(password, salt);
const user = await User.create({ name, email, passwordHash });
const token = signToken(user);
res.status(201).json({ token, user: { id: user._id, name: user.name, email: user
