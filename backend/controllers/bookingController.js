import { sequelize } from '../config/database.js';

const getBooking = () => sequelize.models.Booking;

export const createBooking = async (req, res) => {
  try {
    const { professionalId, categoryId, bookingDate, bookingTime, duration, serviceDescription, location, amount } = req.body;

    if (!professionalId || !categoryId || !bookingDate || !bookingTime || !location || !amount) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const Booking = getBooking();
    const booking = await Booking.create({
      userId: req.user.id,
      professionalId,
      categoryId,
      bookingDate,
      bookingTime,
      duration,
      serviceDescription,
      location,
      amount,
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const Booking = getBooking();
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      order: [['bookingDate', 'DESC']],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingsForProfessional = async (req, res) => {
  try {
    const Booking = getBooking();
    const bookings = await Booking.findAll({
      where: { professionalId: req.user.id },
      order: [['bookingDate', 'DESC']],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const Booking = getBooking();
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check authorization
    if (booking.userId !== req.user.id && booking.professionalId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const Booking = getBooking();
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Only professional and user can update
    if (booking.professionalId !== req.user.id && booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await booking.update({ status });

    res.json({
      message: 'Booking status updated successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const validStatuses = ['pending', 'completed', 'failed', 'refunded'];

    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }

    const Booking = getBooking();
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.update({ paymentStatus });

    res.json({
      message: 'Payment status updated successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const Booking = getBooking();
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await booking.update({ status: 'cancelled' });

    res.json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
