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

const getEvents = async (req, res) => {

    const token = req.headers['access-token'];
    const response = await pool.query(`SELECT * FROM events`);

    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
                try {
                    res.status(200).json(response.rows);
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

    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
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

                req.decoded = decoded;
            }
        });
    } else {
        res.send({
            mensaje: 'Invalid Token'
        });
    }
}

const getEventById = async (req, res) => {

    const eventId = req.params.id;
    const response = await pool.query(`SELECT * FROM events WHERE id_event = ${eventId}`);

    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
                try {
                    if (response.rows.length !== 0) {
                        res.status(200).json(response.rows);
                    } else {
                        res.status(400).json({ message: `Can't find event` });
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

const updateEvent = async (req, res) => {

    const eventId = req.params.id;
    const { title,
        description,
        picture,
        id_user,
        latitude,
        longitude,
        latitude_delta,
        longitude_delta } = req.body;

    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
                try {
                    pool.query('UPDATE events SET title = $1, description = $2, picture = $3, id_user = $4, latitude = $5, longitude = $6, latitude_delta = $7, longitude_delta = $8 WHERE id_event = $9', [title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta, eventId]);
                    res.status(201).json({
                        message: `Event updated succesfully`,
                        body: {
                            event: { title, description, picture, id_user, latitude, longitude, latitude_delta, longitude_delta }
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

const deleteEvent = async (req, res) => {

    const eventId = req.params.id;
    const token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, accesKey.get('SECRET_KEY'), (err, decoded) => {
            if (err) {
                return res.json({ mensaje: 'Invalid Token' });
            } else {
                try {
                    pool.query(`DELETE FROM events WHERE id_event = ${eventId}`);
                    res.status(201).json(`Event ${eventId} deleted succesfully`);
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
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent
}