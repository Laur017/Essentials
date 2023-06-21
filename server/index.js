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

const stripe = require("stripe")('sk_test_51NKGenIQQZ7VOqr89VCQPOjDwlsK82AInI9fklyJ3Qn4i41S0PcVhFgKaq8zHUgV7cTnRc5TPFQIUwLpwgsrFVsM00YzmNr8cE');

app.use(express.static("public"));

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
    const sqlSelect = "SELECT user, email, password, role, paid FROM users;"

    db.query(sqlSelect, (err,result)=>{
        res.send(result);
    })
})

app.get('/api/roleInfo', (req,res)=>{
    const sqlSelect = "SELECT user, email, subject FROM users WHERE role = ? and paid = 1 ;"
    const role = req.query.role
    db.query(sqlSelect,[role], (err,result)=>{
        res.send(result);
    })
})

app.get('/api/getCourses', (req,res)=>{
    const sqlSelect = "SELECT curs_id, curs_name FROM courses WHERE id_sub = ?;"

    const id = req.query.sub_id;

    db.query(sqlSelect,[id], (err,result)=>{
        res.send(result)
        console.log(result)
    })
})

app.get('/api/getAvailableSubjects', (req, res) => {
    const sqlSelect =
      'SELECT sub_id, sub_name, sub_des FROM subjects s JOIN users u ON FIND_IN_SET(s.sub_id, u.subject) WHERE u.email = ?;';
  
    const email = req.query.email;
  
    console.log(email);
  
    db.query(sqlSelect, [email], (err, result) => {
    res.send(result)
    console.log(result)
    })
})

app.get('/api/getCourseInfo', (req,res)=>{
    const sqlSelect =
    "SELECT curs_id, curs_name, curs_yt, curs_file FROM courses WHERE curs_id = ? ;"

    const id = req.query.id

    console.log(id)

    
    db.query(sqlSelect, [id], (err, result) => {
        res.send(result)
        console.log(result)
        })

})

app.get('/api/getQuestionsForQuiz', (req,res)=>{
    const sqlSelect =
    "SELECT id_que, que_text, correct_answ FROM questions WHERE id_cours = ?;"

    const id_cours = req.query.id_cours
    
    db.query(sqlSelect, [id_cours], (err, result) => {
        res.send(result)
        console.log(result)
        })

})

app.get('/api/getAnswersForQuiz', (req,res)=>{
    const sqlSelect =
    "SELECT id_answer, answer_text,question_id FROM answers WHERE ic = ?;"

    const ic = req.query.ic
    
    db.query(sqlSelect, [ic], (err, result) => {
        res.send(result)
        console.log(result)
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
    })
})

app.post('/api/deleteFromList', (req,res)=>{

    const email = req.body.email
    const sqlDelete  ="DELETE FROM pending_list WHERE p_email = ?;"
    
    db.query(sqlDelete,[email], (err,result)=>{
        console.log(result)
    })
})

app.post('/api/addQuestion', (req,res)=>{

    const id_curs = req.body.id_curs
    const que_text = req.body.que_text
    const correct_answ = req.body.correct_answ
    const sqlInsert  ="INSERT INTO questions (id_cours, que_text, correct_answ) VALUES (?, ?, ?);"
    
    db.query(sqlInsert,[id_curs, que_text, correct_answ], (err,result)=>{
        console.log(result)
        res.send(result)
    })
})

app.post('/api/addAnswer', (req,res)=>{

    const question_id = req.body.question_id
    const answer_text = req.body.answer_text
    const ic = req.body.ic

    const sqlInsert  ="INSERT INTO answers (question_id, answer_text, ic) VALUES (?, ?, ?);"
    
    db.query(sqlInsert,[question_id, answer_text,ic], (err,result)=>{
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
    const paid = req.body.paid

    const sqlInsert  ="INSERT INTO users (user, email, password, role, subject, year, paid) VALUES (?, ?, ?, ?, ?, ?, ?);"
    db.query(sqlInsert,[user, email, password, role, sub, year, paid], (err,result)=>{
        console.log(result)
    })
})

app.post('/api/addCourse', (req, res) => {
    const id = req.body.id
    const link_yt = req.body.link_yt
    const link_file = req.body.link_file
  
    console.log(link_file)

    const sqlUpdate = "UPDATE courses SET curs_yt = ?, curs_file = ? WHERE curs_id = ?"
    db.query(sqlUpdate, [link_yt, link_file, id], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Error occurred while updating course' })
      } else {
        console.log(result)
        res.status(200).json({ message: 'Course updated successfully' })
      }
    })
  })

  app.post('/api/updatePaid',(req,res) => {
    const email = req.body.email

    const sqlUpdate = "UPDATE users SET paid = 2 WHERE email = ?;"
  
    db.query(sqlUpdate, [email], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json({ message: 'Error occurred while updating users' })
      } else {
        console.log(result)
        res.status(200).json({ message: 'Users Paid updated successfully' })
      }
    })
})

  app.post('/pay', async (req,res) =>{
    const {email} = req.body
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        curency: 'usd',
        metadata: {integration_check: 'accept_a_payment'},
        recepient_email: email
    })
    res.json({'client_secret': paymentIntent['client_secret']})
  })
  



app.listen(3001, ()=>{
    console.log("running on port 3001")
})