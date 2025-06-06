const express = require('express');
const upload = require('../middlewares/upload');
const router = express.Router();

// POST /api/upload
router.post('/', upload.single('file'), (req, res) => {
  res.status(200).json({
    message: 'File uploaded successfully',
    filePath: `/${req.file.path}`,
  });
});

module.exports = router;
