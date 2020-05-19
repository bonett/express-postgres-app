const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'wilfridobonett',
    password: '',
    database: 'restapi',
    port: '5432'
})

const getUserEvent = async (req, res) => {
    const response = await pool.query(`SELECT * FROM user_event`);

    try {
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getUserEvent
}