const express = require('express');
const router = express.Router();

// Contact form route
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please fill all required fields' });
        }
        
        // Here you would typically save to database
        // For now, just return success
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
});

module.exports = router;