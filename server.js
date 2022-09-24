const { response } = require('express');
const express = require('express')
const mysql = require('mysql')
const app = express()
var cors = require('cors');
const port = 3001

const uid = "prajwal"
let pass = "123456"


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(express.json());
// connect db

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'resellers'
})
con.connect()

con.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

app.post('/addreseller',(req,res)=>{
const name=req.body.name
const emailaddress=req.body.emailaddress
const phone=req.body.phone
const commission=req.body.commission
const einno=req.body.einno

  let sql = `INSERT INTO resellers.resellerlist (name, email, phone, commission ,einno) VALUES ('${name}', '${emailaddress}', '${phone}','${commission}','${einno}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
   res.send(result+err)
  });
})


app.get('/viewuser',(req,res)=>{
  let Answer;
  con.query('SELECT * FROM resellerlist' ,(err,result)=>{
    if (err) console.log( err);
   res.status(200).send(result)
  });
})



// con.end();



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username != uid) {
    res.send("Enter correct email");
  }
  else if (password != pass) {
    res.send("Enter correct password");
  }
  else {
    res.send("Welcome")
  }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})