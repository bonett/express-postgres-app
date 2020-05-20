const { Router } = require('express');
const router = Router();

const { authenticate } = require('../controllers/auth.controller');

router.post('/authenticate', authenticate);

module.exports = router;