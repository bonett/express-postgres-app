const dotenv = require('dotenv');
dotenv.config();
const config = require('./../../config');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    if (email === "wilfrido@gmail.com" && password === "123456") {
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, config.SECRET_KEY, {
            expiresIn: 100
        });
        res.json({
            mensaje: 'Granted',
            token: token
        });
    } else {
        res.json({ mensaje: "Invalid credentials" })
    }
}

module.exports = {
    authenticate
}