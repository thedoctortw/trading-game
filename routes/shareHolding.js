var express = require('express');
var router = express.Router();
var shareController = require("../controllers/shareHolding");

// Create a new share
router.post('/', shareController.create);
// Update a single share with id
router.put('/:id', shareController.update);
// Delete all shares
router.delete('/:id', shareController.delete);
// Retrieve a single share with id
router.get('/:id', shareController.findOne);
// Retrieve all shares
router.get('/', shareController.findAll);
// Delete all shares
router.delete('/', shareController.deleteAll);

module.exports = router;
