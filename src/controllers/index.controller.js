const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'wilfridobonett',
    password: '',
    database: 'restapi',
    port: '5432'
})

const getUsers = async (req, res) => {
    const response = await pool.query(`SELECT * FROM users`);

    try {
        console.log(response.rows);
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createUser = async (req, res) => {
    const { name, email, country } = req.body;
    pool.query(`INSERT INTO users (name, email, country) VALUES ($1, $2, $3)`, [name, email, country]);

    try {
        res.status(201).json({
            message: "User created succesfully",
            body: {
                user: { name, email, country }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

    res.send(`User ${name} created`);
}

const getUserById = async (req, res) => {

    const userId = req.params.id;
    const response = await pool.query(`SELECT * FROM users WHERE id = ${userId}`);

    try {
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {

    const userId = req.params.id;
    const { name, email, country } = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2, country = $3 WHERE id = $4', [name, email, country, userId]);

    try {
        res.status(200).json({
            message: "User updated succesfully",
            body: {
                user: { name, email, country }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteUser = async (req, res) => {

    const userId = req.params.id;
    const response = await pool.query(`DELETE FROM users WHERE id = ${userId}`);

    try {
        res.status(200).json(`User ${userId} deleted succesfully`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}