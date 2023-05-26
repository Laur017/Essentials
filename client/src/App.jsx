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

const App = () => {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState('')

  function disSet(){
    setLogged(false)
    setUser('')
  }

  function settingUser(name) {
    setLogged(true)
    setUser(name)
  }

// TODO: Send info from the child to the parrent 

  return (
    <div className="App">
      <Navbar logged={logged} user={user} disSet={disSet}/>
      
      <Routes>
        <Route path='/' element={
          <div className='home'>
            <HomeText />
            <div className='model-home'>
              {/* <Home /> */}
            </div>
          </div>
        } />
        <Route path='/login' element={
          <div className="login">
            <div className="model-login">
              {/* <LoginModel /> */}
            </div>
              <Login settingUser={settingUser}/>
          </div>
        } />

        <Route path='/signup' element={
          <div className="login">
            <div className="model-login">
              {/* <LoginModel /> */}
            </div>
              <SignUp />
          </div>
        } />

        <Route path='/main/student' element={<Main />} />
        <Route path='/mainadmin' element={<Admin />} />
        <Route path='/wait' element={<WaitingPage/>} />

        <Route path='/learn' element={
          <div className="learn-d">
              <Learn />
          </div>
        } />

      </Routes>
    </div>
  )
}

export default App
