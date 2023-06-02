import { useEffect, useState } from "react"
import Axios from 'axios'
import Folder from './folder.png'
import {useNavigate} from 'react-router-dom'

const ListCoursesContent = (props) => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/getCourses', {
        params:{
            sub_id:props.sub_id
        }
    })
    .then((response) =>{
        setCourses(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
    
    },[])

    const handleNextPage = (id,name) => {

        if(props.upl === 1){
            navigate('/upload-course', {
                state:{id:id, upl:1, name:name, sub_id:props.sub_id, sub_name:props.name}
            })
        }else{
            navigate('/create-quiz',{
                state:{id:id, upl:2, name:name, sub_id:props.sub_id, sub_name:props.name}
            })
        }
    }

    return(
        <>
        <h1>{props.name} {props.upl === 1?"Courses":"Exercises"}</h1>
        <div className="list-cours">
            
            {courses.map((course, indx) => (
                <div key={course.curs_id} className="cours-list" onClick={()=> handleNextPage(course.curs_id,course.curs_name)}>
                    <img src={Folder} />
                    <h3>{indx+1}. {course.curs_name}</h3>
                </div>
            ))}
        </div>
        </>
    )
}

export default ListCoursesContent