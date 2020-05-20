const { Router } = require('express');
const router = Router();

const {
    getUsers,
    getUserById,
    deleteUser,
    getUserEventsById,
    updateUser } = require('../controllers/user.controller');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.get('/userEvent/:id', getUserEventsById);
router.delete('/users/:id', deleteUser);

module.exports = router;