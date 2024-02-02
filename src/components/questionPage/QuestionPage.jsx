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
  // data from test instruction page
  const { questions, setQuestions, question_id, setQuestion_id } =
    useContext(Context);

  const navigate = useNavigate();
  let { topicName } = useParams();

  const [actualQuestions, setActualQuestions] = useState({});
  const [id_list, setId_list] = useState([]);
  const [count, setCount] = useState(0);
  const [currentQuestion, setcurrentQuestion] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState();
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [resultList, setResultList] = useState({});
  const [topicIdData, settopicId] = useState(questions["topicId"]);
  const [languageIdData, setLanguageIdData] = useState(questions["languageId"]);
  const [level, setLevel] = useState(questions["level"]);
  const [resultObject, setResultObject] = useState({});

  useEffect(() => {
    setActualQuestions(questions.key);
    setId_list(Object.keys(questions.key));
  }, [questions.key]);

  useEffect(() => {
    if (id_list.length > 0) {
      setcurrentQuestion(actualQuestions[id_list[count]]);
    }
  }, [id_list, count]);

  useEffect(() => {}, [id_list]);
  function changeQuestionNumber() {
    // Move to the next question
    if (count < id_list.length - 1) {
      setCount((prevIndex) => prevIndex + 1);
      // Clear the selected answer when moving to the next question
      setCurrentAnswer((preValue) => null);

      setcurrentQuestion((prevQuestions) => actualQuestions[id_list[count]]);
    } else {
      // Add the result value for the current question
      setResultObject((resultObject) => ({
        resultList: resultList,
        topicId: topicIdData,
        languageId: languageIdData,
        level: level,
      }));
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

  function handleAnswer(data) {
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

  const postResultData = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/mcq/add_resultData/`,
        {
          resultData: resultObject,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        }
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    // Check if resultObject is not null and has the necessary properties
    if (
      resultObject &&
      resultObject.resultList &&
      resultObject.topicId &&
      resultObject.languageId &&
      resultObject.level
    ) {
      postResultData();
      setQuestion_id(id_list);
      navigate("/resultPage");
    }
  }, [resultObject]); // The effect will run whenever resultObject changes

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
                  <span className="questionNumber"> {count + 1} .</span>
                  <span className="question-page-content__questions">
                    {currentQuestion["question"] || ""}
                  </span>
                  <div className="question-page-content__optionParent">
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={
                          currentQuestion["option"]
                            ? currentQuestion["option"][0]
                            : ""
                        }
                      />
                      <p>
                        {currentQuestion["option"]
                          ? currentQuestion["option"][0]
                          : ""}
                      </p>
                    </div>
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={
                          currentQuestion["option"]
                            ? currentQuestion["option"][1]
                            : ""
                        }
                      />
                      <p>
                        {currentQuestion["option"]
                          ? currentQuestion["option"][1]
                          : ""}
                      </p>
                    </div>

                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={
                          currentQuestion["option"]
                            ? currentQuestion["option"][2]
                            : ""
                        }
                      />
                      <p>
                        {currentQuestion["option"]
                          ? currentQuestion["option"][2]
                          : ""}
                      </p>
                    </div>
                    <div className="question-page-content__options">
                      <input
                        type="radio"
                        name="option"
                        className="option"
                        onChange={(e) => handleAnswer(e.target.value)}
                        value={
                          currentQuestion["option"]
                            ? currentQuestion["option"][3]
                            : ""
                        }
                      />
                      <p>
                        {currentQuestion["option"]
                          ? currentQuestion["option"][3]
                          : ""}
                      </p>
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
              {/* <div className="question-page__question-list">
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
              </div> */}
            </div>
          </section>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
