const { Router } = require('express');
const router = Router();

const {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    getUserEventsById,
    updateUser } = require('../controllers/user.controller');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.get('/userEvent/:id', getUserEventsById);
router.delete('/users/:id', deleteUser);

module.exports = router;