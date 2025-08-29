require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {
    await mongoose.connect(process.env.mongodb_url);
    console.log('MongoDB connected');
}

module.exports = { connection };