import { sequelize } from '../config/database.js';

const getProfessionalProfile = () => sequelize.models.ProfessionalProfile;
const getUser = () => sequelize.models.User;

export const createProfessionalProfile = async (req, res) => {
  try {
    const { categoryId, experience, qualifications, hourlyRate, certifications, portfolio } = req.body;

    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is required' });
    }

    const ProfessionalProfile = getProfessionalProfile();
    const profile = await ProfessionalProfile.create({
      userId: req.user.id,
      categoryId,
      experience,
      qualifications,
      hourlyRate,
      certifications,
      portfolio,
    });

    res.status(201).json({
      message: 'Professional profile created successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfessionalProfile_endpoint = async (req, res) => {
  try {
    const ProfessionalProfile = getProfessionalProfile();
    const profile = await ProfessionalProfile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfessionalById = async (req, res) => {
  try {
    const ProfessionalProfile = getProfessionalProfile();
    const User = getUser();
    
    const profile = await ProfessionalProfile.findOne({
      where: { userId: req.params.id },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture', 'bio'],
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({ error: 'Professional not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfessionalProfile = async (req, res) => {
  try {
    const { experience, qualifications, hourlyRate, certifications, portfolio, availability } = req.body;
    const ProfessionalProfile = getProfessionalProfile();
    
    const [updatedCount] = await ProfessionalProfile.update(
      { experience, qualifications, hourlyRate, certifications, portfolio, availability },
      { where: { userId: req.user.id } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profile = await ProfessionalProfile.findOne({
      where: { userId: req.user.id },
    });

    res.json({
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProfessionals = async (req, res) => {
  try {
    const { categoryId, minRating, sortBy } = req.query;
    const ProfessionalProfile = getProfessionalProfile();
    const User = getUser();

    let where = { isApproved: true };
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (minRating) {
      where.rating = { [sequelize.Op.gte]: minRating };
    }

    let order = [['createdAt', 'DESC']];
    if (sortBy === 'rating') {
      order = [['rating', 'DESC']];
    } else if (sortBy === 'experience') {
      order = [['experience', 'DESC']];
    }

    const professionals = await ProfessionalProfile.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture', 'phone'],
        },
      ],
      order,
    });

    res.json(professionals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
