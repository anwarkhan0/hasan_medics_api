const express = require('express');
const router = express.Router();

// Middleware placeholders (we'll implement these later)
const { protect } = require('../middlewares/authMiddleware');

const {
  getMyBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

router.route('/')
  .get(protect, getMyBookings)
  .post(protect, createBooking);

router.route('/:id')
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);


module.exports = router;
