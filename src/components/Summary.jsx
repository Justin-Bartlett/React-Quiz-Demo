/* eslint-disable react/prop-types */
import quizOverImg from "../assets/quiz-complete.png"
import QUESTIONS from "../questions"

export default function Summary({ userAnswers }) {
  let skippedAnswers = userAnswers.filter((answer) => answer === null)
  let correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0],
  )

  const skippedAnswersPercentage = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  )
  const correctAnswersPercentage = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  )

  const incorrectAnswersPercentage =
    100 - skippedAnswersPercentage - correctAnswersPercentage

  return (
    <article id="summary">
      <img src={quizOverImg} alt="Trophy icon" />
      <h2>The quiz is over dude. Ffs!!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectAnswersPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer"

          if (answer === null) {
            cssClass += " skipped"
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct"
          } else {
            cssClass += " incorrect"
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
            </li>
          )
        })}
      </ol>
    </article>
  )
}
