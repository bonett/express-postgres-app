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
module.exports = {
    getUsers,
    createUser
}