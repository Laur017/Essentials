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
        }else if (props.upl === 2){
            navigate('/create-quiz',{
                state:{id:id, upl:2, name:name, sub_id:props.sub_id, sub_name:props.name}
            })
        } else if (props.upl === 3){
             navigate('/learn',{
                state:{id:id, upl:3, name:name, sub_id:props.sub_id, sub_name:props.name}
            })
        } else if (props.upl === 4){
            navigate('/practice',{
                state:{id:id, upl:4, name:name, sub_id:props.sub_id, sub_name:props.name, email:props.email, role:props.role}
            })
        } else if (props.upl === 5){
            navigate('/practice',{
                state:{id:id, upl:5, name:name, sub_id:props.sub_id, sub_name:props.name, email:props.email, role:props.role}
            })
        }else if (props.upl === 6){
            navigate('/create-quiz',{
                state:{id:id, upl:6, name:name, sub_id:props.sub_id, sub_name:props.name}
            })
        }else if (props.upl === 7){
            navigate('/test-results',{
                state:{id:id, upl:7, name:name, sub_id:props.sub_id, sub_name:props.name, email:props.email, role:props.role}
            })
        }
    }

    return(
        <>
        <h1>{props.name} {props.upl === 1 || props.upl === 3?"Courses": props.upl === 5 ? "Test": props.upl ===6? "Test Upload": props.upl === 7? "Test Results" :"Exercises"}</h1>
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