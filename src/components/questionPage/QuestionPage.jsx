import React, { useEffect, useContext, useState } from "react";
// import MyContext, { useMyContext } from "../MyContext";
import Context from "../Context";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
import questionPage from "./questionPage.css";
import { json, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiTimerLine } from "react-icons/ri";
import { ResultPage } from "../resultPage/ResultPage";
import { NavbarForQuiz } from "../navbar/NavbarForQuiz";

export function QuestionPage() {
  // data from test instruction page
  const {
    questions,
    setQuestions,
    question_id,
    setQuestion_id,
    isUserActive,
    setIsUserActive,
    resultContent,
    setResultContent,
    newUserToQuiz,
    setNewUserToQuiz,
  } = useContext(Context);
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
  const [isSelected, setSelected] = useState(0);
  const [seconds, setSeconds] = useState(40);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Update minutes and hours when seconds reach 60
  useEffect(() => {
    if (seconds === 0) {
      changeQuestionNumber();
    }
  }, [seconds]);

  useEffect(() => {
    setActualQuestions(questions.key || {});
    setId_list(Object.keys(questions.key || {}));
  }, [questions.key]);

  useEffect(() => {
    if (id_list.length > 0 && actualQuestions[id_list[count]]) {
      setcurrentQuestion(actualQuestions[id_list[count]]);
    }
  }, [id_list, count]);

  function changeQuestionNumber() {
    // Move to the next question
    setSeconds(40);
    setSelected(0);

    if (count < id_list.length - 1) {
      setCount((prevIndex) => prevIndex + 1);

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
  }

  useEffect(() => {
    // Set the correct answer for the next question after state update
    setCorrectAnswer(() => currentQuestion["answer"]);
  }, [currentQuestion]);

  function handleAnswer(data) {
    if (data) {
      setCurrentAnswer(data);
    }
  }
  useEffect(() => {
    // Check if the selected answer is correct
    const isCorrect = currentAnswer === correctAnswer;

    // Make sure id_list[count] is defined before updating resultList
    if (id_list[count]) {
      // Add the result value for the current question
      setResultList((prevResultList) => ({
        ...prevResultList,
        [id_list[count]]: {
          selectedAnswer: currentAnswer,
          isCorrect: isCorrect,
        },
      }));
    }
  }, [currentAnswer]);

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

      setNewUserToQuiz(response?.data?.message);

      setResultContent(response?.data?.data);

      setQuestion_id(id_list);
      sessionStorage.removeItem("isUserActive");
      navigate("/resultPage");
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
      console.log("resultObject", resultObject);
      postResultData();
    }
  }, [resultObject, resultList, topicIdData, languageIdData, level]); // The effect will run whenever resultObject changes

  useEffect(() => {}, [currentAnswer]);

  return (
    <>
      {localStorage.getItem("token") ? (
        JSON.parse(sessionStorage.getItem("isUserActive")) ? (
          <section>
            <NavbarForQuiz />
            <section className="question-page">
              <div className="question-page__title">
                <div>
                  {topicName}: {count + 1} of {id_list.length} Questions
                </div>
                <div className="Question_time">
                  <span>
                    <RiTimerLine />
                  </span>
                  {seconds} sec
                </div>
              </div>
              <div className="question-page__body">
                <div className="question-page-content">
                  <form id="questionForm">
                    <span className="question-page-content__questions">
                      {currentQuestion["question"] || ""}
                    </span>
                    <div className="question-page-content__optionParent">
                      {currentQuestion["option"]
                        ? currentQuestion["option"].map((item, index) => (
                            <div
                              key={index}
                              className="question-page-content__options"
                              onClick={() => setSelected(index + 1)}
                              style={{
                                backgroundColor:
                                  isSelected == index + 1 ? "#072c50" : "white",
                                color:
                                  isSelected == index + 1 ? "white" : "#072c50",
                              }}
                            >
                              <div
                                key={index}
                                onClick={() => {
                                  handleAnswer(item);
                                }}
                              >
                                {item}
                              </div>
                            </div>
                          ))
                        : ""}
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
              </div>
            </section>
          </section>
        ) : (
          <ResultPage />
        )
      ) : (
        <Login />
      )}
    </>
  );
}
