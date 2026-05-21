const bcrypt = require('bcrypt');
const db = require('../config/db');


// ================= REGISTER =================

exports.register = async (req, res) => {

    const { username, email, password } = req.body;

    // Basic Validation
    if (!username || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    try {

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert User
        const sql = `
            INSERT INTO users(username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, hashedPassword],
            (err, result) => {

                if (err) {
                    console.log(err);
                    return res.status(500).send("User may already exist");
                }

                res.send("User Registered Successfully");
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
};


// ================= LOGIN WITH OTP =================

exports.login = (req, res) => {

    const { email, password } = req.body;

    // Basic Validation
    if (!email || !password) {
        return res.status(400).send("All fields are required");
    }

    // Check User
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Server Error");
        }

        // User Not Found
        if (result.length === 0) {
            return res.status(401).send("Invalid Email or Password");
        }

        const user = result[0];

        // Compare Password
        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).send("Invalid Email or Password");
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Store OTP in session
        req.session.otp = otp;
        req.session.tempUserId = user.id;

        console.log("OTP:", otp);

        res.send("OTP Sent. Check terminal.");
    });
};


// ================= VERIFY OTP =================

exports.verifyOTP = (req, res) => {

    const { otp } = req.body;

    if (!otp) {
        return res.status(400).send("OTP is required");
    }

    // Compare OTP
    if (parseInt(otp) === req.session.otp) {

        // Final Login Success
        req.session.userId = req.session.tempUserId;

        // Remove temp values
        delete req.session.otp;
        delete req.session.tempUserId;

        res.send("2FA Verification Successful");
    } else {
        res.status(401).send("Invalid OTP");
    }
};


// ================= LOGOUT =================

exports.logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).send("Logout Failed");
        }

        res.send("Logout Successful");
    });
};