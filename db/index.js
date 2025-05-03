const mongoose = require('mongoose');

// Enabled query filter sanitization
mongoose.set('sanitizeFilter', true);
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});
mongoose.connection.on('error', (error) => {
    console.error('DB connection error');
    console.error(error);
});

module.exports = mongoose;
