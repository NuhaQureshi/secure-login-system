const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();

// Database Connection
require('./config/db');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

// Auth Middleware
const { isAuthenticated } = require('./middleware/authMiddleware');

// Routes
app.use('/auth', require('./routes/authRoutes'));

// Home Route
app.get('/', (req, res) => {
    res.send("Secure Login System Running");
});

// Protected Dashboard Route
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send("Welcome to Secure Dashboard");
});

// Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});