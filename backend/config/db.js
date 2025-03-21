const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => { console.log("MongoDB Connected") })
        .catch((err) => { console.log("MongoDB Connection error:", err) });
}

module.exports = connectDB;