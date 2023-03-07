var express = require('express');
var router = express.Router();
var tradeController = require("../controllers/trade");

// Create a new trade
router.post('/', tradeController.create);
// Update a single trade with id
//router.put('/:id', tradeController.update);
// Delete all trades
router.delete('/:id', tradeController.delete);
// Retrieve a single trade with id
router.get('/:id', tradeController.findOne);
// Retrieve all trades
router.get('/', tradeController.findAll);
// Delete all trades
router.delete('/', tradeController.deleteAll);

module.exports = router;
