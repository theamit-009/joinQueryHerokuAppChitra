var express = require('express');
var router = express.Router();
const pool = require('../db/dbConfig');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/contactList',(request, response) => {

  pool
  .query('SELECT sfid, name FROM salesforce.Contact')
  .then((contactQueryResult) => {
  console.log('contactQueryResult : '+JSON.stringify(contactQueryResult.rows));
  response.send(contactQueryResult.rows);
  })
  .catch((contactQueryError)=>{
  response.send(contactQueryError);
  })
  
  });


  router.post('/',(request, response) => {
      let body = request.body;
      console.log('body '+JSON.stringify(body));
    
    
  })


  router.get('/loginGet',(request, response) => {
    response.render('login.ejs');
  })


  router.post('/loginPost',(request, response) => {
    let {firstName, lastName, email} = request.body;
    console.log('firstName  : '+firstName+' lastName : '+lastName+' email : '+email);
    console.log('Your Response body is :    '+JSON.stringify(request.body));

    pool
    .query('INSERT into salesforce.Contact (firstname, lastname, email) values ($1, $2, $3)',[firstName,lastName,email])
    .then((contactQueryResult) => {
          console.log('contactQueryResult   : '+JSON.stringify(contactQueryResult));
          response.send(contactQueryResult);
    })
    .catch((contactQueryError) => {
          console.log('contactQueryError  : '+contactQueryError);
          response.send(contactQueryError);
    })

    //response.send('Hello  '+body.firstName);
  })
  


  router.get('/uderstandJoinQuery',(request, response) => {

  //Normal Query
  /* 
  
     pool
    .query('SELECT name, email , AccountId FROM salesforce.Contact ')
    .then((contactQueryResult) => {
          console.log('contactQueryResult   : '+JSON.stringify(contactQueryResult.rows));
          //response.send(contactQueryResult.rows);
          response.render('joinQuery',{lstContact:contactQueryResult.rows});
    })
    .catch((contactQueryError) => {
          console.log('contactQueryError  : '+contactQueryError);
          response.send(contactQueryError);
    })

 */

pool
.query('SELECT acc.name as conname , con.email , acc.name as accname FROM salesforce.Contact as con INNER JOIN salesforce.account as acc ON con.AccountId = acc.sfid')
.then((contactQueryResult) => {
      console.log('contactQueryResult   : '+JSON.stringify(contactQueryResult.rows));
      //response.send(contactQueryResult.rows);
      response.render('joinQuery',{lstContact:contactQueryResult.rows});
})
.catch((contactQueryError) => {
      console.log('contactQueryError  : '+contactQueryError);
      response.send(contactQueryError);
})

  });

module.exports = router;
