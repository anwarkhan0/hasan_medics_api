const Booking = require('../models/Booking');


const asyncHandler = require('express-async-handler');



exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id });
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};


// @desc    Update a booking
// @route   PUT /api/bookings/:id
// @access  Private (Owner or Admin)
exports.updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Only allow owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to update this booking' });
  }

  const { service, date } = req.body;
  booking.service = service || booking.service;
  booking.date = date || booking.date;

  const updated = await booking.save();

  res.status(200).json(updated);
});


// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Owner or Admin)
exports.deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Only allow owner or admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to delete this booking' });
  }

  await booking.deleteOne();
  res.status(200).json({ message: 'Booking deleted' });
});
