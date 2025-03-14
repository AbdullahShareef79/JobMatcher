const express = require('express');
const path = require('path');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../../frontend/public')));


// API routes
app.use('/api/resume', resumeRoutes);

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));

});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});