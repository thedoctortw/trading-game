var express = require('express');
var router = express.Router();
var userController = require("../controllers/user");

// Create a new user
router.post('/', userController.create);
// Update a single user with id
router.put('/:id', userController.update);
// Delete all users
router.delete('/:id', userController.delete);
// Retrieve a single user with id
router.get('/:id', userController.findOne);
// Retrieve all users
router.get('/', userController.findAll);
// Delete all users
router.delete('/', userController.deleteAll);

module.exports = router;
