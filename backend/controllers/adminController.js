import { sequelize } from '../config/database.js';

const getAdminLog = () => sequelize.models.AdminLog;
const getProfessionalProfile = () => sequelize.models.ProfessionalProfile;
const getUser = () => sequelize.models.User;

export const approveProfessional = async (req, res) => {
  try {
    const { professionalId } = req.body;
    const ProfessionalProfile = getProfessionalProfile();

    const [updatedCount] = await ProfessionalProfile.update(
      { isApproved: true },
      { where: { userId: professionalId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Professional not found' });
    }

    // Log the action
    const AdminLog = getAdminLog();
    await AdminLog.create({
      adminId: req.user.id,
      action: 'Approved Professional',
      targetType: 'professional',
      targetId: professionalId,
      status: 'approved',
    });

    res.json({ message: 'Professional approved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rejectProfessional = async (req, res) => {
  try {
    const { professionalId, reason } = req.body;
    const ProfessionalProfile = getProfessionalProfile();

    const [updatedCount] = await ProfessionalProfile.update(
      { isApproved: false },
      { where: { userId: professionalId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Professional not found' });
    }

    // Log the action
    const AdminLog = getAdminLog();
    await AdminLog.create({
      adminId: req.user.id,
      action: 'Rejected Professional',
      targetType: 'professional',
      targetId: professionalId,
      details: { reason },
      status: 'rejected',
    });

    res.json({ message: 'Professional rejected successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPendingProfessionals = async (req, res) => {
  try {
    const ProfessionalProfile = getProfessionalProfile();
    const User = getUser();

    const professionals = await ProfessionalProfile.findAll({
      where: { isApproved: false },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
        },
      ],
    });

    res.json(professionals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const User = getUser();
    const ProfessionalProfile = getProfessionalProfile();
    const Booking = sequelize.models.Booking;
    const Review = sequelize.models.Review;

    const totalUsers = await User.count();
    const totalProfessionals = await ProfessionalProfile.count({
      where: { isApproved: true },
    });
    const pendingProfessionals = await ProfessionalProfile.count({
      where: { isApproved: false },
    });
    const totalBookings = await Booking.count();
    const completedBookings = await Booking.count({
      where: { status: 'completed' },
    });
    const totalReviews = await Review.count();

    const stats = {
      totalUsers,
      totalProfessionals,
      pendingProfessionals,
      totalBookings,
      completedBookings,
      totalReviews,
      averageRating: (await getAverageRating()) || 0,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAverageRating = async () => {
  try {
    const Review = sequelize.models.Review;
    const result = await Review.findAll({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
      ],
    });
    return result[0]?.dataValues?.averageRating || 0;
  } catch (error) {
    return 0;
  }
};

export const getAdminLogs = async (req, res) => {
  try {
    const AdminLog = getAdminLog();
    const logs = await AdminLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50,
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const suspendUser = async (req, res) => {
  try {
    const { userId, reason } = req.body;
    const User = getUser();

    const [updatedCount] = await User.update(
      { isSuspended: true },
      { where: { id: userId } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log the action
    const AdminLog = getAdminLog();
    await AdminLog.create({
      adminId: req.user.id,
      action: 'Suspended User',
      targetType: 'user',
      targetId: userId,
      details: { reason },
      status: 'approved',
    });

    res.json({ message: 'User suspended successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
