import { Link, useNavigate } from 'react-router-dom'
import Logout from './Images/logout.png'
import {useState} from 'react'

const Navbar = (props) => {
    const [isUserClicked, setIsUserClicked] = useState(false)
    const navigate = useNavigate();

    const handleLogedOut = () => {
        setIsUserClicked(false)
        props.disSet()
        navigate("/")
    }

    console.log(props.logged)


    const navContent = props.logged ? 
    (
        <div className="nav-user">
            <h2 onClick={()=>setIsUserClicked(!isUserClicked)}>{props.user}</h2>
            <div className={isUserClicked? "open-down" : ""}>
                <img className='logout-img' src={Logout} />
                <button className='logout-btn' onClick={handleLogedOut}>Log out</button>
            </div>
        </div>
    ) : (
        <div className="nav-buttons">
            <Link to="/login"><button className="btn-one">Sign in</button></Link>
            <Link to="/signup"><button className="btn-two">GET STARTED</button></Link>
        </div>
    )

    return(
        <nav>
            <div onClick={()=>navigate(props.logged ? "/main" : "/")} className="nav-title"> <h2>Essentials</h2></div>
            { navContent }
        </nav>
    )
}

export default Navbar