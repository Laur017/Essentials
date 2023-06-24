import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import Plus from "./add.png";
import Close from "./close.png";
import Create from "./create.png";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios'

const QuizPageContent = () => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      questions: [{ question: "", answers: [] }],
    },
  });
  const location = useLocation()
  const navigate = useNavigate()
  const {id, upl, name, sub_id, sub_name} = location.state
  const [aux, setAux] = useState()

  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const watchQuestions = useWatch({
    control,
    name: "questions",
    defaultValue: [],
  });


  const onSubmit = async (data) => {
    console.log("Form submitted!", data);
  
    for (const question of data.questions) {
      console.log("Question:", question);
      const questionResponse = await Axios.post('http://localhost:3001/api/addQuestion', {
        id_curs: upl === 6 ? id + 18 : id,
        que_text: question.question,
        correct_answ: question.selectedAnswer,
      });
  
      const questionId = questionResponse.data.insertId;
      console.log("Question ID:", questionId);
  
      console.log("Answers:", question.answers);
  
      if (question.answers && question.answers.length > 0) {
        for (let i = 0; i < question.answers.length; i++) {
          const answer = question.answers[i];
          console.log("Answer:", answer);
          await Axios.post('http://localhost:3001/api/addAnswer', {
            question_id: questionId,
            answer_text: answer.name,
            ic: upl === 6 ? id + 18 : id,
          });
        }
      }
    }
  
    };
  
  
  
  
  const addAnswer = (questionIndex) => {
    const currentAnswers = [...(watchQuestions[questionIndex]?.answers || [])];
    currentAnswers.push({ name: "", isCorrect: false });
    setValue(`questions[${questionIndex}].answers`, currentAnswers);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const currentAnswers = [...watchQuestions[questionIndex]?.answers];
    currentAnswers.splice(answerIndex, 1);
    setValue(`questions[${questionIndex}].answers`, currentAnswers);
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const currentAnswers = [...watchQuestions[questionIndex]?.answers];
    currentAnswers[answerIndex].name = event.target.value;
    setValue(`questions[${questionIndex}].answers`, currentAnswers);
  };

  const handleIsCorrectChange = (questionIndex, answerIndex, event) => {
    const currentAnswers = [...watchQuestions[questionIndex]?.answers];
    currentAnswers.forEach((answer, index) => {
      answer.isCorrect = index === answerIndex && event.target.checked;
    });
    setValue(`questions[${questionIndex}].answers`, currentAnswers);
  };

  const renderAnswers = (questionIndex) => {
    const answers = watchQuestions[questionIndex]?.answers || [];

    return answers.map((answer, answerIndex) => (
      <div key={answerIndex}>
        <div className="quiz-answ-div">
          <input
            type="radio"
            {...register(`questions[${questionIndex}].selectedAnswer`)}
            value={answer.name}
            onChange={(event) =>
              handleIsCorrectChange(questionIndex, answerIndex, event)
            }
          />
          <input
            type="text"
            value={answer.name}
            onChange={(event) =>
              handleAnswerChange(questionIndex, answerIndex, event)
            }
            placeholder="Answer"
          />
          <button
            type="button"
            onClick={() => removeAnswer(questionIndex, answerIndex)}
            className="quiz-que-btn"
          >
            <img src={Close} />
          </button>
        </div>
      </div>
    ));
  };

  const handleGoBack = () => {
    navigate('/courses-list', {state:{sub_id:sub_id, upl:upl, name:sub_name}})
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-quiz">
      <h1>Create a {upl ===6 ? "test " : "quiz "} for {name} </h1>
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <div className="quiz-que-div">
          <input
            type="text"
            {...register(`questions[${questionIndex}].question`)}
            placeholder="Question"
          />
          
            <button type="button" onClick={() => removeQuestion(questionIndex)} className="quiz-que-btn"> 
            <img src={Close} />
            </button>
          </div>
          {renderAnswers(questionIndex)}
          <button type="button" onClick={() => addAnswer(questionIndex)} className="quiz-add-answ-btn">
            Add Answer
          </button>
          
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendQuestion({ question: "", answers: [] })}
        className="quiz-btn-add"
      >
        <img src={Plus} />
        Add Question
      </button>
      <div className="quiz-btns">
        <button className="bck-btn" onClick={handleGoBack}>Go Back</button>
        <button type="submit" className="quiz-btn-create" 
          onClick={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)
            navigate('/courses-list', {
              state: { sub_id: sub_id, upl: upl, name: sub_name },
            })
          }}
          >
        <img src={Create} />
          Create {upl === 6 ? "Test" : "Quiz"}
        </button>
      </div>
      
    </form>
  );
};

export default QuizPageContent;

