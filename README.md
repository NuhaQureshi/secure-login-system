# Secure Login System with 2FA 🔐

A secure login web application built using Node.js, Express.js, and MySQL with password hashing, session management, protected routes, and Two-Factor Authentication (2FA).

---

# Features

✅ User Registration  
✅ Secure Login System  
✅ Password Hashing using bcrypt  
✅ Session Management using express-session  
✅ Logout Functionality  
✅ Protected Dashboard Route  
✅ SQL Injection Protection  
✅ Input Validation  
✅ Two-Factor Authentication (OTP Based)  

---

# Technologies Used

- Node.js
- Express.js
- MySQL
- bcrypt
- express-session
- HTML
- dotenv

---

# Project Structure

```bash
secure-login-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   └── authRoutes.js
│
├── views/
│   ├── register.html
│   ├── login.html
│   └── otp.html
│
├── server.js
├── package.json
└── README.md
Installation
1. Clone Repository
git clone https://github.com/yourusername/secure-login-system.git
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file and add:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=secure_login

SESSION_SECRET=mysecretkey
4. Start Server
npm run dev
Database Setup

Run the following SQL commands in MySQL:

CREATE DATABASE secure_login;

USE secure_login;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
Authentication Flow
Registration
User enters username, email, and password
Password is hashed using bcrypt
User data stored securely in MySQL
Login
User enters email and password
Password verified using bcrypt.compare()
2FA Verification
OTP generated after successful password verification
OTP stored temporarily in session
User verifies OTP to complete login
Protected Dashboard
Only authenticated users can access dashboard route
Logout
Session destroyed securely
Security Features
Password Hashing using bcrypt
Session-based Authentication
SQL Injection Prevention using Parameterized Queries
Protected Routes Middleware
OTP-based Two-Factor Authentication
Future Improvements
Email OTP Delivery
JWT Authentication
Password Reset Feature
Improved Frontend UI
Account Verification
Author

Developed by
Nuha Qureshi
