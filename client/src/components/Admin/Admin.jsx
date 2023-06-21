import { useState, useEffect} from "react"
import Axios from 'axios'
import EmptyBox from './empty-box.png'

const Admin = () =>{
    const [pendingList, setPendingList] = useState([])
    const [teachersList, setTeachersList] = useState([])
    const [studentsList, setStudentsList] = useState([])
    const [nrOfTeachers, setNrOfTeachers] = useState([0,0,0])
    const [stYear, setStYear] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [whatToShow, setWhatToShow] = useState(1)
    const [subjectTotals, setSubjectTotals] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/getPendingList')
        .then((response)=>{
            setPendingList(response.data)
        })
        Axios.get('http://localhost:3001/api/roleInfo', {
            params: {
            role: "teacher"
            }
        })
        .then((response) => {
            setTeachersList(response.data);
            setNrOfTeachers([0,0,0])
            response.data.map((i) => {
            i.subject.split(",").forEach((k) => {
                if (k < 3) {
                setNrOfTeachers(prevTeachers => [prevTeachers[0] + 1, prevTeachers[1], prevTeachers[2]]);
                } else if (k < 5) {
                setNrOfTeachers(prevTeachers => [prevTeachers[0], prevTeachers[1] + 1, prevTeachers[2]]);
                } else {
                setNrOfTeachers(prevTeachers => [prevTeachers[0], prevTeachers[1], prevTeachers[2] + 1]);
                }
            });
            });
        })
        .catch((error) => {
            console.error(error);
        });

        Axios.get('http://localhost:3001/api/roleInfo', { 
            params:{
                role:"student"
            }})
        .then((response)=>{
            setStudentsList(response.data)
            const stYearValues = response.data.map(student => Math.round(student.subject.split(",").length / 2))
            setStYear([...stYearValues])
            setTotalMoney(response.data.length * 10)
        })
        
    },[])

    const updateUsers = (email) => {
        Axios.post('http://localhost:3001/api/updatePaid',{email:email})
    }

    function handleAccept(user, email, password, role, sub, year){
        Axios.post('http://localhost:3001/api/addUser', {user:user, email:email, password:password, role:role, sub:sub, year:year, paid:role === "teacher" ? 1 : 0})
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

    const handlePay = () => {
        studentsList.forEach(student => {
            updateUsers(student.email)
        })
        setStudentsList([])

        let email= "popa.laur.01@gmail.com"

        const accessToken = 'A21AALA51YDhSNSdJ8ppAs1MnCdWeE7zaOg_0C8qKNvJpC_yU9bN93O7eb5vfPAxi9qsgeI8hkL7pVtVkoq_7OzSj_OLAW5pg';

        const senderBatchId = Math.random().toString(36).substring(7)

        const payload = {
          sender_batch_header: {
            sender_batch_id: senderBatchId,
            email_subject: 'Your Payout is here!'
          },
          items: [
            {
              recipient_type: 'EMAIL',
              amount: {
                value: "6.27",
                currency: 'USD'
              },
              receiver: email,
              note: 'Thank you for using our service!'
            }
          ]
        }
      
        Axios.post('https://api.paypal.com/v1/payments/payouts', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .then(response => {
            console.log('Payment successful:', response.data);
          })
          .catch(error => {
            console.error('Payment error:', error);
          })
      }


    return(
        <div className="admin-main">
            <div className="ad-btns">
                <button onClick={()=>setWhatToShow(1)}>Accept Users</button>
                <button onClick={()=>setWhatToShow(2)}>Show Teachers</button>
                <button onClick={()=>setWhatToShow(3)}>Show Students</button>
            </div>
            
            {whatToShow === 1 ?
            <>
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

            <hr /></>
        : whatToShow === 2 ? 
        <>
        <div className="admin-title-table">
                <h3>Username</h3>
                <h3>Email</h3>
                <h3>Year</h3>
                <h3>To Pay</h3>
            </div>
            <hr />
            {teachersList.length !==0 ?teachersList.map(i=>
                (
                <div className="admin-list">
                    <h4>{i.user}</h4>
                    <h4>{i.email}</h4>
                    <h4>{i.subject.split(",").map(k => k<3?"I ": k<5 ? "II " : "III " )}</h4>
                    <h4>{i.subject.split(",").map(k => {
                        let total
                        if (k < 3) {
                            total = stYear.filter(x => x === 1).length * 6 / (nrOfTeachers[0]) +
                            stYear.filter(x => x === 2).length / (nrOfTeachers[0]) +
                            stYear.filter(x => x === 3).length / (nrOfTeachers[0])
                            return (studentsList.length ? Number(Math.round(total+'e2')+'e-2'):0);
                        } else if (k < 5) {
                            total = stYear.filter(x => x === 2).length * 7 / (nrOfTeachers[1]) +
                            stYear.filter(x => x === 3).length / (nrOfTeachers[1])
                            return (studentsList.length ? Number(Math.round(total+'e2')+'e-2'):0);
                        } else {
                            total = stYear.filter(x => x === 3).length * 8 / (nrOfTeachers[2])
                            return (studentsList.length ? Number(Math.round(total+'e2')+'e-2'):0);
                        }
                        }).reduce((partialSum, a) => partialSum + a, 0)}</h4>
                    
                </div>)
            ): 
            <div className="empty-box">
                <img src={EmptyBox} />
                <h4>No teacher !</h4>
            </div>
            }
            <hr />
            <button className="pay-teachers-btn" onClick={()=>handlePay()}><strong>$ </strong>Pay Teachers <strong> $</strong></button>
        </>
        
        :        
        <>
        <div className="admin-title-table">
            
                <h3>Username</h3>
                <h3>Email</h3>
                <h3>Year</h3>
                <h3></h3>
                <h3></h3>
                <h3></h3>
                {studentsList.length !==0 && (<h3>Total money: ${totalMoney}</h3>)}
            </div>
            <hr />
            {studentsList.length !==0 ?studentsList.map(i=>{
                return (
                <div className="admin-list">
                    <h4>{i.user}</h4>
                    <h4>{i.email}</h4>
                    <h4>{
                    Math.round(i.subject.split(",").length/2)
                    }</h4>
                </div>)
            }): 
            <div className="empty-box">
                <img src={EmptyBox} />
                <h4>No student !</h4>
            </div>
            }
            <hr />
            
        </>
        }

        </div>
    )
}

export default Admin