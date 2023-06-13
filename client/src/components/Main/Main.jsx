import MainContent from "./MainContent"
import MainModel from "./MainModel"
import { useState } from 'react'
import { useLocation } from "react-router-dom"

const Main = () => {
    const [subject, setSubject] = useState(0)
    const location = useLocation()
    const {email} = location.state
    
    const handleSub = (aux) => {
        setSubject(aux)
    }

    return(
        <div className="main">
            <MainContent handleSub={handleSub} email={email}/>
            <div className="model-main">
              <MainModel subject={subject}/>
            </div>
          </div>
    )

}

export default Main