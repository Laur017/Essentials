import MainContent from "./MainContent"
import MainModel from "./MainModel"
import { useState } from 'react'
import { useLocation } from "react-router-dom"

const Main = () => {
    const [subject, setSubject] = useState('')
    const location = useLocation()
    const {email, role} = location.state
    
    const handleSub = (aux) => {
        setSubject(aux)
    }

    return(
        <div className="main">
            <MainContent handleSub={handleSub} email={email} role={role}/>
            <div className="model-main">
              <MainModel subject={subject}/>
            </div>
          </div>
    )

}

export default Main