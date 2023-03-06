var express = require('express');
var router = express.Router();
/**
 * 
 */
router.post('/buy', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/buy', function(req, res, next) {
    res.json('respond with a resource');
});

module.exports = router;
