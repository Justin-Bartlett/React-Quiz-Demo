/* eslint-disable react/prop-types */
import quizOverImg from "../assets/quiz-complete.png"

export default function Summary({ userAnswers }) {
  return (
    <>
      <div id="summary">
        <img src={quizOverImg} alt="Trophy icon" />
        <h2>The quiz is over dude. Ffs!!</h2>
      </div>
    </>
  )
}
