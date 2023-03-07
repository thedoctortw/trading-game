var express = require('express');
var router = express.Router();
var portfolioController = require("../controllers/portfolio");

// Create a new portfolio
router.post('/', portfolioController.create);
// Update a single portfolio with id
router.put('/:id', portfolioController.update);
// Delete all portfolios
router.delete('/:id', portfolioController.delete);
// Retrieve a single portfolio with id
router.get('/:id', portfolioController.findOne);
// Retrieve all portfolios
router.get('/', portfolioController.findAll);
// Delete all portfolios
router.delete('/', portfolioController.deleteAll);

module.exports = router;
