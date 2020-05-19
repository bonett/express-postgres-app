const { Router } = require('express');
const router = Router();

const {
    getEvents,
    createEvent,
    getEventById,
    updateEvent,
    deleteEvent } = require('../controllers/event.controller');

router.get('/events', getEvents);
router.post('/events', createEvent);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

module.exports = router;