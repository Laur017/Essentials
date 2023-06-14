import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import Plus from "./add.png";
import Close from "./close.png";
import Create from "./create.png";

const QuizPageContent = () => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      questions: [{ question: "", answers: [] }],
    },
  });

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

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
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
        <div>
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
          >
            Remove Answer
          </button>
        </div>
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Render the question fields */}
      {questions.map((question, questionIndex) => (
        <div key={question.id}>
          <input
            type="text"
            {...register(`questions[${questionIndex}].question`)}
            placeholder="Question"
          />
          {renderAnswers(questionIndex)}
          <button type="button" onClick={() => addAnswer(questionIndex)}>
            Add Answer
          </button>
          <button type="button" onClick={() => removeQuestion(questionIndex)}>
            Remove Question
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendQuestion({ question: "", answers: [] })}
      >
        Add Question
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizPageContent;

// const [count, setCount] = useState(2)
// const [ansNr, setAnsNr] = useState(3)
// const [answerNumber, setAnswerNumber] = useState([[1, 2], [3, 4], [5, 6]])
// const [questionNumber, setQuestionNumber] = useState([1])
// const [questions, setQuestions] = useState([])

// return (
//   <div className='create-quiz'>
//     <h2>Add questions to exercise</h2>
//     {/* {renderQuestions()} */}
//     <button className='quiz-btn-add' onClick={() => handleAnswerNumber(0, 2)}>
//       <img src={Plus} alt="Plus" /> Add Question
//     </button>
//     <button className="quiz-btn-create">
//       <img src={Create} alt="Create" /> Create Quiz
//     </button>
//   </div>
// )

// const handleAnswerNumber = (questionIndex, aux) => {
//   if (aux === 1) {
//     setAnsNr(ansNr + 1)
//     setAnswerNumber((prevAnswerNumber) => {
//       const updatedAnswerNumber = [...prevAnswerNumber]
//       if (!updatedAnswerNumber[questionIndex]) {
//         updatedAnswerNumber[questionIndex] = []
//       }
//       updatedAnswerNumber[questionIndex] = [...updatedAnswerNumber[questionIndex], ansNr]
//       return updatedAnswerNumber
//     })
//   } else {
//     setCount(count + 1)
//     setQuestionNumber((prevQuestionNumber) => [...prevQuestionNumber, count])
//   }
// }

// const handleDelete = (valueToDelete, aux, questionIndex, answerIndex) => {
//   if (aux === 1) {
//     setAnswerNumber((prevAnswerNumber) => {
//       const updatedAnswerNumber = [...prevAnswerNumber]
//       updatedAnswerNumber[questionIndex].splice(answerIndex, 1)
//       return updatedAnswerNumber
//     })
//   } else {
//     const updatedValues = questionNumber.filter((value) => value !== valueToDelete)
//     setQuestionNumber(updatedValues)
//   }
// }

// const renderAnswers = (questionIndex) => {
//   if (!answerNumber[questionIndex]) {
//     return null
//   }

//   return answerNumber[questionIndex].map((i, indx) => (
//     <label key={indx} className='quiz-ans'>
//       <input type='radio' name={`question${questionIndex}`} value={`q${questionIndex}-${i}`} />
//       <input type='text' placeholder={`Answer ${indx + 1}`} />
//       <button onClick={() => handleDelete(i, 1, questionIndex, indx)}>
//         <img src={Close} />
//       </button>
//     </label>
//   ))
// }

// const renderQuestions = () => {
//   return questionNumber.map((i, indx) => (
//     <div className='quiz-tab' key={indx}>
//       <label className='quiz-que'>
//         <strong>{indx + 1}</strong> <input
//           type='text'
//           placeholder='The question :'
//           value={questions[indx] || ''}
//           onChange={(e) => {
//             const updatedQuestions = [...questions]
//             updatedQuestions[indx] = e.target.value
//             setQuestions(updatedQuestions)
//             console.log(questions)
//           }}
//         />
//         <button onClick={() => handleDelete(i, 2, indx)}>
//           <img src={Close} />
//         </button>
//       </label>

//       {renderAnswers(indx)}
//       <button onClick={() => handleAnswerNumber(indx, 1)}>Add an answer ...</button>
//     </div>
//   ))
// }
