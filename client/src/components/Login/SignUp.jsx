import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51NKGenIQQZ7VOqr817DlnhVmfsGFKhrYDP96tIiF6SrjwHaIuuhdVOvS5Kt5WcH8eJstVq7h2Vj8LDXAOxPGladY00CDLbHAfU");



const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [retypePass, setRetypePass] = useState('')
    const [emailList, setEmailList] = useState([])
    const [teacher, setTeacher] = useState(false)
    const [subject,setSubject] = useState([])
    const [year,setYear] = useState('')
    const navigate = useNavigate()

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, []);
  
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
  

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/getEmail')
        .then((response)=>{
            setEmailList(response.data)
        })
    },[])

    const handleChangeSubject = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
          setSubject((prevSubjects) => [...prevSubjects, value]);
        } else {
          setSubject((prevSubjects) =>
            prevSubjects.filter((subject) => subject !== value)
          );
        }
    
      }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }
    
    function isEmailUsed(email) {
        let aux = false
        emailList.map(i => {if(i.email === email) aux = true})
        // console.log(emailList[0].email)
        return aux
    }  

    const submitRegister = (event) =>{
        event.preventDefault()

        if(!username){
            alert('Enter an username !')
        } else if(!email){
            alert('Enter an email !')
        } else if(!isValidEmail(email)){
            alert("Invalid email ! Retype your email")
            setEmail('')
        } else if(isEmailUsed(email)){
            alert("Email is already in use, please use another email !")
            setEmail('')
        } else if(!password){
            alert('Enter a password !')
            setPassword('')
            setRetypePass('')
        } else if(password.length<8){
            alert('Password to short ! Please use at least 8 characters !')
            setPassword('')
            setRetypePass('')
        } else if(retypePass!==password){
            alert(' The password is not matching ! ')
            setPassword('')
            setRetypePass('')
        }else if(teacher && !subject){
            alert(' Please entry the subject that you are teaching ! ')
        }else if(!teacher && !year){
            alert(' Select the year of study ! ')
        } else{
            Axios.post('http://localhost:3001/api/insert', {username:username, email:email, password:password, teacher:teacher, subject:subject.join(","), year:teacher?"3":year})
            .then(()=>{
                console.log("User added !")
            })
            setUsername('')
            setEmail('')
            setPassword('')
            setRetypePass('')
            navigate("/wait")
        }
        //subject.join(",")
    }

    const settingYear = (event) =>{
        setYear(event.target.value)
        if(event.target.value === "1"){
            setSubject([1,2])
        }else if(event.target.value === "2"){
            setSubject([1,2,3,4])
        }else if(event.target.value === "3"){
            setSubject([1,2,3,4,5,6])
        }
        
    }

    return(
        <div className="signup-form">
            <h3>Sign Up</h3>
            <div className="inputs">
                <h4>Username:</h4>
                <input type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} required></input>
                <h4>Email:</h4>
                <input type="email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                <h4>Password:</h4>
                <input type="password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                <h4>Retype Password:</h4>
                <input type="password" placeholder="Retype your Password" value={retypePass} onChange={(e)=>setRetypePass(e.target.value)} required></input>
                <div className='inp-role'>
                    <h4>Role:</h4>
                    <label className="radio-button">
                        <input 
                        type='radio' 
                        name='role' 
                        value='student' 
                        checked={!teacher} 
                        onChange={()=>setTeacher(!teacher)}
                        />
                        <span className="button-label">Student</span>
                    </label>
                    <label className="radio-button">
                        <input 
                        type='radio' 
                        name='role' 
                        value='teacher'
                        checked={teacher} 
                        onChange={()=>setTeacher(!teacher)}
                        />
                        <span className="button-label">Teacher</span>
                    </label>
                </div>
                {teacher && (
                    <div className='inp-subj'>
                        <h4>Subjects that you teach:</h4>
                        <label><input type='checkbox' value="1" onChange={handleChangeSubject}/>Math</label>
                        <label><input type='checkbox' value="2" onChange={handleChangeSubject}/>Probabilistics</label>
                        <label><input type='checkbox' value="3" onChange={handleChangeSubject}/>Database</label>
                        <label><input type='checkbox' value="4" onChange={handleChangeSubject}/>Java</label>
                        <label><input type='checkbox' value="5" onChange={handleChangeSubject}/>Python</label>
                        <label><input type='checkbox' value="6" onChange={handleChangeSubject}/>Game development</label>
                    </div>
                )}

                {!teacher && (
                    <div className="inp-year">
                        <h4>Year:</h4>
                        <label className="radio-button">
                        <input 
                        type='radio' 
                        name='year' 
                        value='1'  
                        onChange={settingYear}
                        />
                        <span className="button-label">1</span>
                    </label>
                    <label className="radio-button">
                        <input 
                        type='radio' 
                        name='year' 
                        value='2'
                        onChange={settingYear}
                        />
                        <span className="button-label">2</span>
                    </label>
                    <label className="radio-button">
                        <input 
                        type='radio' 
                        name='year' 
                        value='3'
                        onChange={settingYear}
                        />
                        <span className="button-label">3</span>
                    </label>
                    </div>
                    )}
                
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                    </Elements>
                )}
                
                <button onClick={submitRegister}>Sign Up</button>
            </div>
            <p>Already have an account ? <Link to="/login">Log In</Link></p>
        </div>
    )
}

export default SignUp