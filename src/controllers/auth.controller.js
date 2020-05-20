const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const express = require('express'),
    config = require('./../../config'),
    accesKey = express();

accesKey.set('SECRET_KEY', config.SECRET_KEY);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const getToken = async (req, res) => {

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
}

const registerUser = async (req, res) => {
    const { name, email, country, username, password } = req.body;
    const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const userData = response && response.rows;

    if (userData.length == 0) {

        pool.query(`INSERT INTO users (name, email, country, username, password) VALUES ($1, $2, $3, $4, $5)`, [name, email, country, username, password]);

        try {
            res.status(201).json({
                message: `User created succesfully`,
                body: {
                    user: { name, email, country, username }
                }
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Email is already taken' });
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const token = req.headers['access-token'];
    const response = await pool.query('SELECT * FROM users WHERE email = $1 && password = $2', [email, password]);

    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
                try {
                    res.status(201).json({
                        message: `Session granted`,
                        body: {
                            isAuthenticated: true
                        }
                    });
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }

                req.decoded = decoded;
            }
        });
    } else {
        res.send({
            mensaje: 'Invalid Token'
        });
    }
}

module.exports = {
    getToken,
    registerUser,
    loginUser
}