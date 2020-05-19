const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'wilfridobonett',
    password: '',
    database: 'restapi',
    port: '5432'
})

const getEvents = async (req, res) => {
    const response = await pool.query(`SELECT * FROM events`);

    try {
        console.log(response.rows);
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createEvent = async (req, res) => {
    const { title, description, picture } = req.body;

    console.log(title, description, picture )
    pool.query(`INSERT INTO events (title, description, picture) VALUES ($1, $2, $3)`, [title, description, picture]);

    try {
        res.status(201).json({
            message: `Event ${title} created`,
            body: {
                event: { title, description, picture }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getEventById = async (req, res) => {

    const eventId = req.params.id;
    const response = await pool.query(`SELECT * FROM events WHERE id_event = ${eventId}`);

    try {
        if(response.rows.length !== 0){
            res.status(200).json(response.rows);
        } else {
            res.status(400).json({ message: `Can't find event` });    
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateEvent = async (req, res) => {

    const eventId = req.params.id;
    const { title, description, picture } = req.body;
    const response = await pool.query('UPDATE events SET title = $1, description = $2, picture = $3 WHERE id_event = $4', [title, description, picture, eventId]);

    try {
        res.status(201).json({
            message: "Event updated succesfully",
            body: {
                user: { name, email, country }
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteEvent = async (req, res) => {

    const eventId = req.params.id;
    const response = await pool.query(`DELETE FROM events WHERE id_event = ${eventId}`);

    try {
        res.status(201).json(`Event ${eventId} deleted succesfully`);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
}