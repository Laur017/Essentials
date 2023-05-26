const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

//ALTER TABLE essentialsdatabase.pending_list AUTO_INCREMENT = 1;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'essentialsdatabase'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/getEmail', (req,res)=>{
    const sqlSelect = "SELECT email FROM users;"

    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
})

app.get('/api/getPendingList', (req,res)=>{
    const sqlSelect = "SELECT p_user, p_email, p_role, p_sub, p_year, p_password FROM pending_list;"

    db.query(sqlSelect, (err,result)=>{
        res.send(result);
        console.log(err)
    })
})

app.get('/api/userInfo', (req,res)=>{
    const sqlSelect = "SELECT user, email, password, role FROM users;"

    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
})

app.post('/api/insert', (req,res)=>{

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const role = req.body.teacher ? "teacher" : "student"
    const subject = req.body.subject ? req.body.subject : "all"
    const year = req.body.year

    
    const sqlInsert = "INSERT INTO pending_list (p_user, p_email, p_password, p_role, p_sub, p_year) VALUES (?, ?, ?, ?, ?, ?);"

    db.query(sqlInsert, [username, email, password, role, subject, year], (err,result)=>{
        console.log(result)
        // console.log(err)
    })
})

app.post('/api/deleteFromList', (req,res)=>{

    const email = req.body.email
    const sqlDelete  ="DELETE FROM pending_list WHERE p_email = ?;"
    
    db.query(sqlDelete,[email], (err,result)=>{
        console.log(result)
    })
})

app.post('/api/addUser', (req,res)=>{

    const user = req.body.user
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role
    const sub = req.body.sub
    const year = req.body.year

    const sqlInsert  ="INSERT INTO users (user, email, password, role, subject, year) VALUES (?, ?, ?, ?, ?, ?);"
    db.query(sqlInsert,[user, email, password, role, sub, year], (err,result)=>{
        console.log(result)
    })
})






app.listen(3001, ()=>{
    console.log("running on port 3001")
})