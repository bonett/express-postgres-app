const { Router } = require('express');
const router = Router();

const { 
    getToken,
    registerUser,
    loginUser } = require('../controllers/auth.controller');

router.get('/auth/getToken', getToken);
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

module.exports = router;