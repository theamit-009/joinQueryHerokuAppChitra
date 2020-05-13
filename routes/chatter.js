var express = require('express');
var router = express.Router();
const pool = require('../db/dbConfig');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello I am inside Chatter');
});

router.get('/imagepost',function(request,response) {

  


  pool
  .query('SELECT sfid, name FROM salesforce.Contact')
  .then((contactQueryResult) => {
  console.log('contactQueryResult : '+JSON.stringify(contactQueryResult.rows));
  // response.send(contactQueryResult.rows);
  response.render('chatter',{ contactList : contactQueryResult.rows});
  })
  .catch((contactQueryError)=>{
  //response.send(contactQueryError);
  response.render('chatter',{ contactQueryError : contactQueryError});
  })

});



  
module.exports = router;
