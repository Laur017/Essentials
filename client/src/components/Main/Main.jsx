import MainContent from "./MainContent"
import MainModel from "./MainModel"
import { useState } from 'react'
import { useLocation } from "react-router-dom"
import { PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js'


const Main = () => {
    const [subject, setSubject] = useState('')
    const location = useLocation()
    const {email, role, paid} = location.state
    
    console.log(paid)

    const handleSub = (aux) => {
        setSubject(aux)
    }

    return (
      paid === 0 ? (
        <div className="main-plata">
          <h1>If you want to use the 
            courses that the teachers are providing you should
            pay a fee of $10 
          </h1>
        </div>
      ) : (
        <div className="main">
          <MainContent handleSub={handleSub} email={email} role={role}/>
          <div className="model-main">
            <MainModel subject={subject}/>
          </div>
        </div>
      )
    )
    

}

export default Main