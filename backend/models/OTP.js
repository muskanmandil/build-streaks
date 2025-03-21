const mongoose = require('mongoose');
const otpSchema = mongoose.Schema({
    email: { type: String, unique: true },
    otp: String,
    expiresAt: Date,
    userData: {
        name: String,
        password: String
    }
});

// Create a TTL(Time-to-Live) index on the expiresAt field
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;