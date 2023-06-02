import MainTeacherContent from "./MainTeacherContent"
import {useLocation} from 'react-router-dom'

const MainTeacher = () => {
    const location = useLocation()
    const {email} = location.state
    return(
        <>
            <MainTeacherContent email={email}/>
        </>
    )

}

export default MainTeacher