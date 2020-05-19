require('dotenv').config();
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
        res.status(200).json(response.rows);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const createEvent = async (req, res) => {

    const {
        title,
        description,
        picture,
        id_user,
        latitude,
        longitude,
        latitude_delta,
        longitude_delta } = req.body;

    pool.query(`INSERT INTO events (title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta]);

    try {
        res.status(201).json({
            message: `Event created succesfully`,
            body: {
                event: { title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta }
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
        if (response.rows.length !== 0) {
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
    const { title,
        description,
        picture,
        id_user,
        latitude,
        longitude,
        latitude_delta,
        longitude_delta  } = req.body;

    const response = await pool.query('UPDATE events SET title = $1, description = $2, picture = $3, id_user = $4, latitude = $5, longitude = $6, latitude_delta = $7, longitude_delta = $8 WHERE id_event = $9', [title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta, eventId]);

    try {
        res.status(201).json({
            message: `Event updated succesfully`,
            body: {
                event: { title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta }
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