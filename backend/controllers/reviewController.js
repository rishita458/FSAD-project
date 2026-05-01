import { sequelize } from '../config/database.js';

const getReview = () => sequelize.models.Review;
const getProfessionalProfile = () => sequelize.models.ProfessionalProfile;

export const createReview = async (req, res) => {
  try {
    const { bookingId, professionalId, rating, review, photos } = req.body;

    if (!bookingId || !professionalId || !rating) {
      return res.status(400).json({ error: 'Please provide required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const Review = getReview();
    const newReview = await Review.create({
      bookingId,
      userId: req.user.id,
      professionalId,
      rating,
      review,
      photos,
      isProfessionalReview: false,
    });

    // Update professional rating
    await updateProfessionalRating(professionalId);

    res.status(201).json({
      message: 'Review created successfully',
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProfessionalReview = async (req, res) => {
  try {
    const { bookingId, userId, rating, review, photos } = req.body;

    if (!bookingId || !userId || !rating) {
      return res.status(400).json({ error: 'Please provide required fields' });
    }

    const Review = getReview();
    const newReview = await Review.create({
      bookingId,
      userId,
      professionalId: req.user.id,
      rating,
      review,
      photos,
      isProfessionalReview: true,
    });

    res.status(201).json({
      message: 'Professional review created successfully',
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsForProfessional = async (req, res) => {
  try {
    const Review = getReview();
    const reviews = await Review.findAll({
      where: { professionalId: req.params.professionalId, isProfessionalReview: false },
      order: [['createdAt', 'DESC']],
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const Review = getReview();
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, review, photos } = req.body;
    const Review = getReview();

    const existingReview = await Review.findByPk(req.params.id);

    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (existingReview.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const oldRating = existingReview.rating;
    await existingReview.update({ rating, review, photos });

    if (oldRating !== rating) {
      await updateProfessionalRating(existingReview.professionalId);
    }

    res.json({
      message: 'Review updated successfully',
      review: existingReview,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const Review = getReview();
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const professionalId = review.professionalId;
    await review.destroy();

    await updateProfessionalRating(professionalId);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to update professional rating
const updateProfessionalRating = async (professionalId) => {
  try {
    const Review = getReview();
    const ProfessionalProfile = getProfessionalProfile();

    const reviews = await Review.findAll({
      where: { professionalId, isProfessionalReview: false },
    });

    if (reviews.length === 0) {
      await ProfessionalProfile.update(
        { rating: 0, totalReviews: 0 },
        { where: { userId: professionalId } }
      );
      return;
    }

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await ProfessionalProfile.update(
      { rating: avgRating.toFixed(2), totalReviews: reviews.length },
      { where: { userId: professionalId } }
    );
  } catch (error) {
    console.error('Error updating professional rating:', error);
  }
};
