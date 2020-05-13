var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' softwares Pvt Ltd.' });
});

router.get('/abcd', function(req, res, next) {
 // res.render('index', { title: 'Kloudrac softwares Pvt Ltd.' });
res.send('Hello Chitranshi');

});


module.exports = router;
