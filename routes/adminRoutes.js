const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

router.get('/users', protect, authorizeRoles('admin'), getAllUsers);

module.exports = router;
