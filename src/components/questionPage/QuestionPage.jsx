import React, { useEffect, useContext, useState } from "react";
// import MyContext, { useMyContext } from "../MyContext";
import Context from "../Context";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
import questionPage from "./questionPage.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function QuestionPage() {
  const { questions, setQuestions } = useContext(Context);
  const navigate = useNavigate();
  let { topicName } = useParams();
  const [actualQuestions, setActualQuestions] = useState(questions.key);
  const [count, setCount] = useState(0);
  const [id_list, setId_list] = useState(Object.keys(actualQuestions));
  const [currentQuestion, setcurrentQuestion] = useState(
    actualQuestions[id_list[count]]
  );
  const [correctAnswer, setCorrectAnswer] = useState(currentQuestion["answer"]);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [resultList, setResultList] = useState({});
  const [mark, setMark] = useState(0);

  const postResultData = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/mcq/add_resultData/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        },
        {
          resultData: resultList,
        }
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // function changeQuestionNumber() {
  //   console.log(correctAnswer);
  //   setResultList((prevResultList) => ({
  //     ...prevResultList,
  //     [id_list[count]]: currentAnswer,
  //   }));

  //   if (count < id_list.length - 1) {
  //     setCount((prevIndex) => prevIndex + 1);

  //     setcurrentQuestion(
  //       (prevQuestions) => actualQuestions[id_list[count + 1]]
  //     );
  //     setCorrectAnswer((prevAnswer) => currentQuestion["answer"]);
  //   } else {
  //     navigate("/resultPage");
  //   }
  //   console.log(resultList);
  // }
  function changeQuestionNumber() {
    // Move to the next question
    if (count < id_list.length - 1) {
      setCount((prevIndex) => prevIndex + 1);

      // Clear the selected answer when moving to the next question
      setCurrentAnswer((preValue) => null);

      setcurrentQuestion(
        (prevQuestions) => actualQuestions[id_list[count + 1]]
      );
    } else {
      navigate("/resultPage");
      // postResultData();
    }
    // Uncheck all radio buttons by resetting the state
    const radioButtons = document.getElementsByName("option");
    radioButtons.forEach((button) => {
      button.checked = false;
    });
  }
  useEffect(() => {
    // Set the correct answer for the next question after state update
    setCorrectAnswer(() => currentQuestion["answer"]);
  }, [currentQuestion]);

  useEffect(() => {
    // Perform actions after the state has been updated
    console.log(correctAnswer);
  }, [correctAnswer]);
  function handleAnswer(data) {
    console.log(data);
    setCurrentAnswer(() => data);
    // Check if the selected answer is correct
    const isCorrect = data === correctAnswer;

    // Add the result value for the current question
    setResultList((resultList) => ({
      ...resultList,
      [id_list[count]]: {
        selectedAnswer: data,
        isCorrect: isCorrect,
      },
    }));
  }

  useEffect(() => {
    // Log the updated resultList whenever it changes
    console.log(resultList);
  }, [resultList]);
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          <section className="question-page">
            <div className="question-page__title">{topicName}</div>
            <div className="question-page__body">
              <div className="question-page-content">
                <form id="questionForm">
                  <span className="questionNumber"> {count + 1} </span>
                  <span className="question-page-content__questions">
                    {currentQuestion["question"]}
                  </span>
                  <div className="question-page-content__optionParent">
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={currentQuestion["option"][0]}
                      />
                      <p>{currentQuestion["option"][0]}</p>
                    </div>
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={currentQuestion["option"][1]}
                      />
                      <p>{currentQuestion["option"][1]}</p>
                    </div>

                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={currentQuestion["option"][2]}
                      />
                      <p>{currentQuestion["option"][2]}</p>
                    </div>
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={currentQuestion["option"][3]}
                      />
                      <p>{currentQuestion["option"][3]}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="question-page-content__submit"
                    name="submit"
                  >
                    <div onClick={changeQuestionNumber}> next </div>
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
