import { useState, useEffect} from "react"
import Axios from 'axios'
import EmptyBox from './empty-box.png'

const Admin = () =>{
    const [pendingList, setPendingList] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/getPendingList')
        .then((response)=>{
            setPendingList(response.data)
        })
    },[])

    function handleAccept(user, email, password, role, sub, year){
        Axios.post('http://localhost:3001/api/addUser', {user:user, email:email, password:password, role:role, sub:sub, year:year})
        .then(()=>{
            console.log("Addes real User !")
        })
        handleDecline(email)
    }

    function handleDecline(em){
        Axios.post('http://localhost:3001/api/deleteFromList', {email:em})
            .then(()=>{
                console.log("here")
            })
        setPendingList(prevPendingList => prevPendingList.filter(i => i.p_email !== em))
    }

    return(
        <div className="admin-main">
            <div className="admin-title-table">
                <h3>Username</h3>
                <h3>Email</h3>
                <h3>Role</h3>
                <h3>Subject</h3>
                <h3>Year</h3>
            </div>
            <hr />
            {pendingList.length !==0 ?pendingList.map(i=>
                (<div className="admin-list">
                    <h4>{i.p_user}</h4>
                    <h4>{i.p_email}</h4>
                    <h4>{i.p_role}</h4>
                    <h4>{i.p_sub}</h4>
                    <h4>{i.p_year}</h4>
                    <button className="admin-acc" onClick={()=>handleAccept(i.p_user,i.p_email, i.p_password, i.p_role, i.p_sub, i.p_year)}>Accept</button>
                    <button className="admin-dec" onClick={()=>handleDecline(i.p_email)}>Decline</button>
                </div>)
            ): 
            <div className="empty-box">
                <img src={EmptyBox} />
                <h4>No one is in the pending list !</h4>
            </div>
            }
            <hr />
        </div>
    )
}

export default Admin