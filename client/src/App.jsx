import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import HomeText from './components/Home/HomeText'
import Navbar from './components/Navbar'
import Login from './components/Login/Login'
import LoginModel from './components/Login/LoginModel'
import SignUp from './components/Login/SignUp'
import Main from './components/Main/Main'
import Learn from './components/Learn/Learn'
import Admin from './components/Admin/Admin'
import WaitingPage from './components/Waiting/WaitingPage'
import CourseUpload from './components/Upload/CourseUpload'
import QuizPage from './components/CreateQuiz/QuizPage'
import ListCourses from './components/ListCourses/ListCourses'
import Practice from './components/Practice/Practice'
import CheckAnswers from './components/Practice/CheckAnswers'


const App = () => {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  function disSet(){
    setLogged(false)
    setUser('')
  }

  function settingUser(name,email,role) {
    setLogged(true)
    setUser(name)
    setEmail(email)
    setRole(role)
  }

// TODO: Send info from the child to the parrent 

  return (
    <div className="App">
      <Navbar logged={logged} user={user} disSet={disSet} email={email} role={role}/>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={
          <div className="login">
            <div className="model-login">
              <LoginModel model={2}/>
            </div>
              <Login settingUser={settingUser}/>
          </div>
        } />

        <Route path='/signup' element={
          <div className="login">
            <div className="model-login">
              <LoginModel model={1}/>
            </div>
              <SignUp />
          </div>
        } />

        <Route path='/main' element={<Main />} />
        <Route path='/mainadmin' element={<Admin />} />
        <Route path='/wait' element={<WaitingPage/>} />

        <Route path='/courses-list' element={<ListCourses />} />

        <Route path='/upload-course' element={<CourseUpload />} />
        <Route path='/create-quiz' element={<QuizPage />} />

        

        <Route path='/learn' element={<Learn />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/results' element={<CheckAnswers />} />


      </Routes>
    </div>
  )
}

export default App
