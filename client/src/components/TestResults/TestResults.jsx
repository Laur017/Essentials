import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Axios from 'axios'

export default function TestResults() {
    const location = useLocation()
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const {id, upl, name, sub_id, sub_name, email, role} = location.state

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/getTestResults', {
            params: {
                id_curs:id,
                year:Math.round(sub_id / 2)
            }
        }).then(response =>
            setData(response.data)
        )
    },[])

  return (
    <div className="test-result-div">
        <h1>{name} Test Results</h1>
        <div className="result-test-table">
                <h3>Username</h3>
                <h3>Email</h3>
                <h3>Total</h3>
        </div>
        <hr />
        {
            data&& data.map(i=>
                <div className="result-test-table">
                    <h4>{i.user}</h4>
                    <h4>{i.email}</h4>
                    <h4>{i.total_stud}</h4>
                </div>
                )
        }
        { data.length === 0  && (<div><h2>No student</h2> </div>)}
        <hr />
        <button className="bck-btn" onClick={() => navigate('/courses-list', {state:{sub_id:sub_id, upl:upl, name:sub_name}})}>Go Back</button>
    </div>
  )
}
