const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate random token
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Send email
const sendEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const resetLink = `http://localhost:5500/reset-password?token=${token}`;

    await transporter.sendMail({
        from: '"PCMOTO" <noreply@pcmoto.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
            <h2>Reset Your Password</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 1 hour.</p>
            <p>If you didn't request this, ignore this email.</p>
        `
    });
};

// Request password reset
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await PasswordReset.deleteMany({ user: user._id });

        const token = generateToken();
        const expires = new Date(Date.now() + 3600000); // 1 hour

        await PasswordReset.create({
            user: user._id,
            token,
            expires
        });

        await sendEmail(email, token);

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const resetToken = await PasswordReset.findOne({
            token,
            expires: { $gt: Date.now() }
        });

        if (!resetToken) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const user = await User.findById(resetToken.user);
        user.password = newPassword;
        await user.save();

        await PasswordReset.deleteOne({ _id: resetToken._id });

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};