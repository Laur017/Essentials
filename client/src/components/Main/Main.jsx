import MainContent from "./MainContent"
import MainModel from "./MainModel"
import { useState } from 'react'

const Main = () => {
    const [subject, setSubject] = useState(0)
    
    const handleSign = (aux) => {
        if (aux === 1){
            if(subject === 0){
                setSubject(0)
            }else{
                setSubject(subject - 1)
            }
        } else {
            if(subject === 4){
                setSubject(4)
            }else{
                setSubject(subject + 1)
            }
        }
    }

    return(
        <div className="main">
            <MainContent handleSign={handleSign} subject={subject}/>
            <div className="model-main">
              {/* <MainModel subject={subject}/> */}
            </div>
          </div>
    )

}

export default Main