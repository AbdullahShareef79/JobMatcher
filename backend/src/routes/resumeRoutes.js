const express = require('express');
const router = express.Router();
const { uploadResume, analyzeResume } = require('../controllers/resumeController');
const upload = require('../utils/fileUpload');

// Upload resume
router.post('/upload', upload.single('file'), uploadResume);

// Analyze resume
router.post('/analyze', analyzeResume);

module.exports = router;