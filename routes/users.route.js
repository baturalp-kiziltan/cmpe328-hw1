const router = require('express').Router();
const controller = require('../controllers/users.controller');

// Bring one user with the unique id.
router.get('/users/:id', (req, res) => {
    controller.getOneUser(req, res);
});

// Bring all users.
router.get('/users', (req, res) => {
    controller.getAllUsers(req, res);
});

// Create a user.
router.post('/users', (req, res) => {
    controller.createUser(req, res);
});

// Update a user's information.
router.patch('/users/:id', (req, res) => {
    controller.updateUser(req, res);
});

// Delete a user.
router.delete('/users/:id', (req, res) => {
    controller.deleteUser(req, res);
});

module.exports = router;