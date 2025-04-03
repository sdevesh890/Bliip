require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = ()=>
{
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));
}

module.exports = connectDB;