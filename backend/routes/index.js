var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/enroll', function(req, res, next) {
  console.log(req.body);
  // res.status(401);
  res.send({'Status':'User Created'});
});

router.post('/registration', function(req, res, next) {
  console.log(req.body);
  // res.status(401);
  res.send({'Status':'User Created'});
});
module.exports = router;
