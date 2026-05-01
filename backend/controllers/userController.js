import { sequelize } from '../config/database.js';
import jwt from 'jsonwebtoken';

// 🔐 Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// 📦 Get User model
const getUser = () => sequelize.models.User;

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  try {
    const User = getUser();
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: role || 'user',
    });

    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  try {
    const User = getUser();

    const { email, password } = req.body;

    console.log("LOGIN REQUEST:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await User.findOne({ where: { email } });

    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Simple password check
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ================= GET USER =================
export const getUser_endpoint = async (req, res) => {
  try {
    const User = getUser();

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// ================= UPDATE USER =================
export const updateUser = async (req, res) => {
  try {
    const User = getUser();

    const { firstName, lastName, phone, bio, profession, profilePicture } = req.body;

    const [updatedCount] = await User.update(
      { firstName, lastName, phone, bio, profession, profilePicture },
      { where: { id: req.user.id } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = await User.findByPk(req.user.id);

    res.json({
      message: 'User updated successfully',
      user,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};