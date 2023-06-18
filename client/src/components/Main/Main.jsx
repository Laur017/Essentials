import MainContent from "./MainContent"
import MainModel from "./MainModel"
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js'


const Main = () => {
    const [subject, setSubject] = useState('')
    const location = useLocation()
    const {email, role, paid} = location.state
    const [p, setP] = useState(paid)
    
    console.log(paid)

    const handleSub = (aux) => {
        setSubject(aux)
    }

    useEffect(() => {
      
    },[p])

    return (
      p === 0 ? (
        <div className="main-plata">
          <h1>If you want to use the 
            courses that the teachers are providing you should
            pay a fee of $10 
          </h1>
          <PayPalScriptProvider options={{"client-id":"AYbapIMjwUbmxI1BTDW0_F6bJ0VoSbpWJ5Rk1_QBdkASecauWOgxB43Jtzp4IPTxVKi2jDpRfHO7DgaB"}}>
            <PayPalButtons 
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "10.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                setP(1)
              }}
            />
          </PayPalScriptProvider>
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