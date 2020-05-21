const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const getUsers = async (req, res) => {

    const response = await pool.query(`SELECT * FROM users`);

    try {
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getUserById = async (req, res) => {

    const userId = req.params.id;
    const response = await pool.query(`SELECT * FROM users WHERE id_user = ${userId}`);

    try {
        if (response.rows.length !== 0) {
            res.status(200).json(response.rows);
        } else {
            res.status(400).json({ message: `Can't find user` });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getUserEventsById = async (req, res) => {

    const userId = req.params.id;
    const response = await pool.query(`SELECT * FROM events WHERE id_user = ${userId}`);

    try {
        if (response.rows.length !== 0) {
            res.status(200).json(response.rows);
        } else {
            res.status(400).json({ message: `Can't find events created` });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {

    const userId = req.params.id;
    const { username, email, password } = req.body;
    const response = await pool.query('UPDATE users SET username= $1, email = $2, password = $3 WHERE id_user = $4', [username, email, password, userId]);

    try {
        res.status(201).json({
            message: "User updated succesfully",
            body: {
                user: { username,  email, password }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {

    const userId = req.params.id;
    const response = await pool.query(`DELETE FROM users WHERE id_user = ${userId}`);

    try {
        res.status(201).json(`User ${userId} deleted succesfully`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserEventsById
}