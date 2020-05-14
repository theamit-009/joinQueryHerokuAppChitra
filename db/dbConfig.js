const {Pool,Client} = require('pg')

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
   
  }

const db =  {
    dbName: 'd2ffka6lrgfbnr',
    username : 'lznmhaykrofadj',
    password : 'fb42b099bef575dafd8729a82de631afb8f39ad336b18a3530efcef28d2dd4ff',
    host : 'ec2-34-224-229-81.compute-1.amazonaws.com',
    dialect: "postgres",
    port : 5432,
    ssl: { rejectUnauthorized: false },
} 

console.log('process.env.DATABASE_URL: '+process.env.DATABASE_URL);

const pool = new Pool(dbConfig);
pool.on('error',function(err){
    console.log('Error Message'+err.message);
    console.log('Error Stack'+err.stack);
})

module.exports = {
    pool,
    query: (text, params, callback) =>{
        return pool.query(text, params, callback)
    }
}