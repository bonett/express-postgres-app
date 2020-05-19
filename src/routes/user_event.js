const { Router } = require('express');
const router = Router();

const { getUserEvent } = require('../controllers/user_event.controller');

router.get('/user_event', getUserEvent);

module.exports = router;