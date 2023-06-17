import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Practice(props) {
    const [courseState, setCourseState] = useState({})
    const [courseData, setCourseData] = useState({})
    const location= useLocation()

    useEffect(() => {
        if (location.pathname === "/practice" && location.state) {
          const { id, upl, name, sub_id, sub_name } = location.state
          setCourseState({ id, upl, name, sub_id, sub_name })
        //   Axios.get('http://localhost:3001/api/getCourseInfo', {params: {id:id}})
        //   .then((response)=>{
        //       setCourseData(response.data[0]) 
        //   })
  
        }
      }, [location.pathname])

    return (
      <div className='practice-div'>
        <h1>{courseState.name} Quiz</h1>
        <div className="quiz-base">
            <h3>1. Intrebarea va veni aici</h3>
            <div className="quiz-raspunsuri">
                <div className="quiz-raspuns">
                <input type="radio" name="id1" id="r1"/>
                <label for="r1">
                • Raspuns 1
                </label>
                </div>
                <div className="quiz-raspuns">
                <input type="radio" name="id1" id="r2"/>
                <label for="r2">
                • Raspuns 2
                </label>
                </div>
            </div>
            <div className="quiz-btns">
                <button>Previous</button>
                <button>Next</button>
            </div>
        </div>
      </div>
    )
}
