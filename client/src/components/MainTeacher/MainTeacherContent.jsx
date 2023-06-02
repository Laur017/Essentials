import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

const MainTeacherContent = (props) => {
    const [subjects, setSubjects] = useState([])
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
  
    useEffect(() => {
        Axios.get('http://localhost:3001/api/getAvailableSubjects', {
            params: {
                email: props.email
            }
        })
        .then((response) => {
            setSubjects(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, []) 

    useEffect(() => {
        console.log(subjects)
    }, [subjects])

    const handleSwitch = (aux) => {
        if (aux === 1) {
            if (count > 0) {
                setCount(count - 1)
            } 
        } else if (aux === 2) {
            if (count < subjects.length - 1) {
                setCount(count + 1)
            }
        }
    }
    
    if (subjects.length === 0) {
        return <div>Loading...</div>
    }
    
    return (
        <div className="text-content">
            <h2>{count + 1} {subjects[count].sub_name}</h2>
            <p>{subjects[count].sub_des}</p>
            <div className="buttons">
                <button onClick={() => navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:1, name:subjects[count].sub_name}})}>Upload Course</button>
                <button onClick={() => navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:2, name:subjects[count].sub_name}})}>Upload Exercises</button>
            </div>
            <div className="content-next">
                <button className='content-minus' onClick={() => handleSwitch(1)}>-</button>
                <h3>{subjects[count].sub_name}</h3>
                <button className='content-plus' onClick={() => handleSwitch(2)}>+</button>
            </div>
        </div> 
    )
}

export default MainTeacherContent
