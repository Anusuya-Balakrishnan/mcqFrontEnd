import React, { useEffect, useContext } from "react";
import MyContext from "../../MyContext";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
import questionPage from "./questionPage.css";
export function QuestionPage() {
  const { questions } = useContext(MyContext);
  useEffect(() => {
    console.log(questions);
  });
  console.log("questions", questions);
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          <section className="question-page">
            <div className="question-page__title">topic</div>
            <div className="question-page__body">
              <div className="question-page-content">
                <form id="questionForm">
                  <span className="questionNumber"> currentQuestion </span>
                  <span className="question-page-content__questions">
                    currentQuestion.question
                  </span>
                  <div className="question-page-content__optionParent">
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        value="{{currentQuestion.option1}}"
                      />
                      <p>currentQuestion.option1</p>
                    </div>
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        value="{{currentQuestion.option2}}"
                      />
                      <p>currentQuestion.option2</p>
                    </div>

                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        value="{{currentQuestion.option3}}"
                      />
                      <p>currentQuestion.option3</p>
                    </div>
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        value="{{currentQuestion.option4}}"
                      />
                      <p>currentQuestion.option4</p>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    className="correctAnswer"
                    value="{{currentQuestion.answer}}"
                  />
                  <button
                    type="button"
                    className="question-page-content__submit"
                    name="submit"
                  >
                    <input type="hidden" className="resultElement" />
                    <a href=""> next </a>
                  </button>
                </form>
              </div>
              <div className="question-page__question-list">
                <div className="question-page__each-question__time">
                  <p>Time</p>
                  <div className="exact-time">00 mins:58 sec</div>
                </div>
                <div className="question-page__each-questionNo-parent">
                  <p>Question Palatte:</p>
                  <div className="question-page__each-question__no"></div>
                </div>
                <div className="question-page__instruction">
                  <div className="question-page__instruction1">
                    <button></button>
                    <p>Answered</p>
                  </div>
                  <div className="question-page__instruction2">
                    <button></button>
                    <p>Not Visited</p>
                  </div>
                  <div className="question-page__instruction3">
                    <button></button>
                    <p>Not Answered</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
