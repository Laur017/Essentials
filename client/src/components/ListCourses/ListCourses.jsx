import ListCoursesContent from './ListCoursesContent'
import {useLocation} from 'react-router-dom'

const ListCourses = () => {
    const location = useLocation()
    const {sub_id, upl, name, email, role} = location.state

    return(
        <>
            <ListCoursesContent sub_id = {sub_id} upl = {upl} name = {name} email = {email} role = {role}/>
        </>
    )
}

export default ListCourses