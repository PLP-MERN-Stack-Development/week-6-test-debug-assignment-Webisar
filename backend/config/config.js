module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/bug-tracker',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key'
};