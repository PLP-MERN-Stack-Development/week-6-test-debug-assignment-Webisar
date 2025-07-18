const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/config');

mongoose.connect(config.mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));