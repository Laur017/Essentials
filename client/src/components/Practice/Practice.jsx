import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import Axios from 'axios'
import Confetti from "react-confetti"

export default function Practice() {
  const [courseState, setCourseState] = useState({})
  const [courseQuestions, setCourseQuestions] = useState([])
  const [courseAnswers, setCourseAnswers] = useState([])
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  const [timeLeft, setTimeLeft] = useState(300);
 
  const CountdownTimer = () => {

    useEffect(() => {
      if (timeLeft === 0) {
        alert("Time is up!");
        handleNextQuestion()
      }
  
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [timeLeft]);
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
  
    return (
      <h1>{formatTime(timeLeft)}</h1>
    );
  };


  useEffect(() => {
    if (location.pathname === "/practice" && location.state) {
      const { id, upl, name, sub_id, sub_name, email, role } = location.state
      setCourseState({ id, upl, name, sub_id, sub_name, email, role })
      Axios.get('http://localhost:3001/api/getQuestionsForQuiz', { params: { id_cours:upl===5? id+18 : id } })
        .then((response) => {
          setCourseQuestions(response.data)
        })
    }
  }, [location.pathname])

  useEffect(() => {
    if (courseQuestions.length > 0) {
      Axios.get('http://localhost:3001/api/getAnswersForQuiz', { params: { ic:courseState.upl===5? courseState.id+18:courseState.id } })
        .then((response) => {
          setCourseAnswers(response.data)
        })
    }
  }, [courseQuestions])

  const handleAnswerSelection = (questionId, answerId) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answerId
    }))
  }

  const handleNextQuestion = () => {
    if(currentQuestionIndex === courseQuestions.length - 1){
      navigate('/results', { state:{
        courseQuestions:courseQuestions, 
        courseAnswers:courseAnswers, 
        selectedAnswers:selectedAnswers,
        id:courseState.id, 
        upl:courseState.upl, 
        name:courseState.name, 
        sub_id:courseState.sub_id, 
        sub_name:courseState.sub_name,
        email:courseState.email,
        role:courseState.role
      }})
    }else{
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1)
  }

  const Intrebarile = () => {
    const question = courseQuestions[currentQuestionIndex]

    return (
      <div className="quiz-base" key={question.id_que}>
        <h3>{currentQuestionIndex + 1}. {question.que_text}</h3>
        <div className="quiz-raspunsuri">
          {
            courseAnswers
              .filter((answer) => answer.question_id === question.id_que)
              .map((answer) => (
                <div className="quiz-raspuns" key={answer.id_answer}>
                  <input
                    type="radio"
                    name={`id${question.id_que}`}
                    id={`r${answer.id_answer}`}
                    checked={selectedAnswers[question.id_que] === answer.id_answer}
                    onChange={() => handleAnswerSelection(question.id_que, answer.id_answer)}
                  />
                  <label htmlFor={`r${answer.id_answer}`}>
                    • {answer.answer_text}
                  </label>
                </div>
              ))
          }
        </div>
        <div className="quiz-btns">
          <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={handleNextQuestion} >{currentQuestionIndex === courseQuestions.length-1 ? "Done" : "Next"}</button>
        </div>
      </div>
    )
  }

  return (
    <div className='practice-div'>
      <h1>{courseState.name} {courseState.upl === 5 ? "Test" : "Quiz"}</h1>
      {courseState.upl === 5 && <CountdownTimer />}
      {courseQuestions.length > 0 && <Intrebarile timeLeft={timeLeft} />}
    </div>
  )
}
