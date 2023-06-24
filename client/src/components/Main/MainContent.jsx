import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Axios from 'axios';

const MainContent = (props) => {

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
                props.handleSub(subjects[count - 1].sub_name)
            } 
        } else if (aux === 2) {
            if (count < subjects.length - 1) {
                setCount(count + 1)
                props.handleSub(subjects[count + 1].sub_name)
            }
        }
    }
    
    if (subjects.length === 0) {
        return <div>Loading...</div>
    }

    const handleGoNextPage = (aux) => {
        if (aux === 1){
            props.role === "student" ?
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:3, name:subjects[count].sub_name, email:props.email, role:props.role}}):
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:1, name:subjects[count].sub_name, email:props.email, role:props.role}})    
        } else if (aux === 2) {
            props.role === "student" ?
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:4, name:subjects[count].sub_name, email:props.email, role:props.role}}):
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:2, name:subjects[count].sub_name, email:props.email, role:props.role}})
        } else if (aux ===3){
            props.role === "student" ?
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:5, name:subjects[count].sub_name, email:props.email, role:props.role}}):
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:6, name:subjects[count].sub_name, email:props.email, role:props.role}})
        } else {
            navigate("/courses-list", {state:{sub_id: subjects[count].sub_id, upl:7, name:subjects[count].sub_name, email:props.email, role:props.role}})
        }
    }

    return(
        <div className="text-content">
            <h2>{count + 1} {subjects[count].sub_name}</h2>
            <p>{subjects[count].sub_des}</p>
            <div className="buttons">
                <button onClick={() => handleGoNextPage(1)}>{props.role === "student" ? "Learn" : "Upload Course"}</button>
                <button onClick={() => handleGoNextPage(2)}>{props.role === "student" ? "Practice" : "Upload Exercises"}</button>
                <button onClick={() => handleGoNextPage(3)}>{props.role === "student" ? "Test" : "Upload Test"}</button>
                {props.role === "teacher" && <button onClick={() => handleGoNextPage(4)}>Show Test Results</button>}
            </div>
            <div className="content-next">
                <button className='content-minus' onClick={() => handleSwitch(1)}>-</button>
                <h3>{subjects[count].sub_name}</h3>
                <button className='content-plus' onClick={() => handleSwitch(2)}>+</button>
            </div>
        </div>
    )
}

export default MainContent