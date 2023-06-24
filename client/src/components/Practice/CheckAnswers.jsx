import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


export default function CheckAnswers() {
    const location = useLocation()
    const navigate = useNavigate()
    const {courseQuestions, courseAnswers, selectedAnswers,id, upl, name, sub_id, sub_name} = location.state
    const totalQue = courseQuestions.length
    let correctRaspuns = 0
    const selectedAnswerIds = Object.values(selectedAnswers);

    const filteredAnswers = courseAnswers.filter(answer =>
        selectedAnswerIds.includes(answer.id_answer)
    );
    
    const AllAnswers = () => (
        courseQuestions.map((i,indx)=>{
            filteredAnswers[indx].answer_text === i.correct_answ ? correctRaspuns+=1: correctRaspuns+=0 
            return(
                <div className={filteredAnswers[indx].answer_text === i.correct_answ? "correct-div":"wrong-div"}>
                    <h3>{indx + 1}. {i.que_text}</h3>
                    <h4>Your answer: {filteredAnswers[indx].answer_text}</h4>
                    <h4>Correct answer: {i.correct_answ}</h4>
                </div>
            

        )})
        
    )
    return (
    <div className='check-answ-div'>
        <h1>Results</h1>
        <div className="answers-grid">
            {AllAnswers()}
        </div>
        <h2>Total: {correctRaspuns} / {totalQue}</h2>
        <div className="check-ans-btns">
            {(correctRaspuns !== totalQue && upl !== 5 ) && <button 
            onClick={()=>
                navigate('/practice',{
                    state:{id:id, upl:upl, name:name, sub_id:sub_id, sub_name:sub_name}
                })
            }
            >Remake Quiz</button>}
            <button
            onClick={()=>
                navigate('/main', { state:{email:'elev1@gmail.com', role:'student'}})
            }
            >Home</button>
      </div>
    </div>
  )
}
