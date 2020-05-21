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
        expiresIn: 54900
    });
    res.json({
        message: 'Granted',
        token: token
    });
}

const registerUser = async (req, res) => {

    const { username, email, password } = req.body;
    const response = await pool.query('SELECT email FROM users WHERE email = $1', [email]);
    const userData = response && response.rows[0];
    const status = userData !== undefined;
    if (!status) {

        pool.query(`INSERT INTO users ( username, email, password) VALUES ($1, $2, $3)`, [username, email, password]);

        try {
            res.status(201).json({
                message: `User created succesfully`,
                status: 'OK',
                body: {
                    user: { email, username }
                }
            });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'Email is already taken', status: 'error' });
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const token = req.headers['access-token'];
    const response = await pool.query('SELECT id_user FROM users WHERE email = $1 AND password = $2', [email, password]);
    const status = response && response.rows[0];
    
    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
                try {
                    if (status !== undefined) {
                        res.status(201).json({
                            isAuthenticated: true,
                            id: status.id_user

                        });
                    } else {
                        res.json({ mensaje: 'You are not authorized' });
                    }
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