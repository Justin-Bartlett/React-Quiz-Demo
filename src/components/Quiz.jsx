import { useCallback, useState } from "react"

import QUESTIONS from "../questions"
import quizOverImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer"

export default function Quiz() {
  let MAXTIME = 15000
  const [answerState, setAnswerState] = useState("")
  const [userAnswers, setUserAnswers] = useState([])

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1
  const quizIsOver = activeQuestionIndex === QUESTIONS.length

  const handleSelectAnswer = useCallback(
    function (selectedAnswer) {
      setAnswerState("answered")
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer]
      })
      setTimeout(() => {
        if (QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct")
        } else {
          setAnswerState("incorrect")
        }
        setTimeout(() => {
          setAnswerState("")
        }, 2000)
      }, 1000)
    },
    [activeQuestionIndex],
  )

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer],
  )

  if (quizIsOver) {
    return (
      <div id="summary">
        <img src={quizOverImg} alt="Trophy icon" />
        <h2>The quiz is over dude. Ffs!!</h2>
      </div>
    )
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
  shuffledAnswers.sort(() => Math.random() - 0.5)

  return (
    <div id="quiz">
      {
        <div id="question">
          {answerState}
          <h2>Question {activeQuestionIndex + 1}</h2>
          <QuestionTimer
            key={activeQuestionIndex}
            timeout={MAXTIME}
            onTimeout={handleSkipAnswer}
          />
          <p>{QUESTIONS[activeQuestionIndex].text}</p>
          <hr />
          <p>Select an answer</p>
          <ul id="answers">
            {shuffledAnswers.map((answer) => {
              const isSelected = userAnswers[userAnswers.length - 1] === answer
              let cssClass = ""

              if (answerState === "answered" && isSelected) {
                cssClass = "selected"
              }

              if (
                (answerState === "correct" || answerState === "incorrect") &&
                isSelected
              ) {
                cssClass = answerState
              }

              return (
                <li className="answer" key={answer}>
                  <button
                    className={cssClass}
                    onClick={() => handleSelectAnswer(answer)}
                  >
                    {answer}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  )
}
