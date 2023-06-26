import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

const Login = (props) => {
    const [usersInfo, setUsersInfo] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    useEffect(()=>{
        Axios.get('http://localhost:3001/api/userInfo')
        .then((response)=>{
            setUsersInfo(response.data)
        })
    },[])

    function submitLogin (event) {
        event.preventDefault()

        let userFound = false

        if(email === "laur.popa.01@gmail.com" && password === "parola123"){
            userFound = true
            props.settingUser("~ A D M I N ~", "laur.popa.01@gmail.com","AYE")
            navigate('/mainadmin')
        }else{
        usersInfo.forEach(i => {
            if(i.email === email){
                bcrypt.compare(password, i.password, function(err, isMatch){
                    if(err){
                        throw err
                    } else if (!isMatch){
                        alert("Password doesn't match !")
                    } else {
                        props.settingUser(i.user, i.email, i.role)
                        navigate('/main', { state:{email:i.email, role:i.role, paid:i.paid}})
                    }
                })
                userFound = true
                props.settingUser(i.user, i.email, i.role)
                navigate('/main', { state:{email:i.email, role:i.role, paid:i.paid}})
            }
        })}

        if(!userFound){
            alert("User doesn't exist! Go to the Sign Up page to create a user!")
            setEmail('')
            setPassword('')
        }
        }
    
    return(

        <div className="login-form">
            <h3>Log In</h3>
            <div className="inputs">
                <h4>Email</h4>
                <input type="email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                <h4>Password</h4>
                <input type="password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                <button onClick={submitLogin}>Sign in</button>
            </div>

            <p>Don't have an account ? 
                <Link to="/signup">
                    Sign up
                </Link>
            </p>
        </div>
    )
}

export default Login