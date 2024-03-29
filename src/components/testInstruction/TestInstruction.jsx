import React, { useEffect, useState, useContext } from "react";
import testInstruction from "./testInstruction.css";
import testInstructionImage from "./image/testInstruction.svg";
import { Link, useParams } from "react-router-dom";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar.jsx";
import axios from "axios";
import Context from "../Context.jsx";
export function TestInstruction() {
  // getting value from useParams
  let { languageId, topicId, topicName } = useParams();

  const [topicIdData, settopicId] = useState("");
  const [languageIdData, setLanguageIdData] = useState("");
  const [topicNameData, settopicName] = useState("");
  const [responseData, setResponseData] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalMark, setTotalMark] = useState(0);
  const { questions, setQuestions, isUserActive, setIsUserActive } =
    useContext(Context);
  const [questionsOnly, setQuestionsOnly] = useState({});
  const [level, setLevel] = useState("");

  var time = 0;
  var mark = 0;
  useEffect(() => {
    setLanguageIdData(languageId);
    settopicId(topicId);
    settopicName(topicName);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/mcq/get_questions/${languageId}/${topicId}/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );
        setResponseData(response?.data?.data["questions"]);
        setQuestionsOnly(response?.data?.data["questions_values"]);
        setLevel(() => response?.data?.data["questions"][0]["level"]);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  useEffect(() => {
    setTotalQuestions(responseData.length);

    for (let eachQuestion of responseData) {
      time += eachQuestion.time;
      mark += eachQuestion.mark;
      // console.log(eachQuestion["questions"]);
    }
    setTotalTime(time);
    setTotalMark(mark);
  }, [responseData]);

  useEffect(() => {
    setQuestions({
      key: questionsOnly,
      topicId: topicId,
      languageId: languageId,
      level: level,
    });
  }, [responseData]);

  const createSession = () => {
    const storedValue = JSON.parse(sessionStorage.getItem("isUserActive"));

    const isUserActiveValue = storedValue ? JSON.parse(storedValue) : false;
    if (!isUserActiveValue) {
      sessionStorage.setItem("isUserActive", JSON.stringify(true));
      setIsUserActive(true);
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          <section>
            <div className="instruction-page">
              <div className="instruction-page__content">
                <div className="instruction-page__title">
                  {topicName} Test Instructions:
                </div>
                <div className="instruction-page__content_details">
                  <p>Test Details:</p>
                  <ul>
                    <li>Total Number of Questions: {totalQuestions}</li>
                    <li>Each Questions carries 1 mark</li>
                    <li>Time Allocated: {totalTime} minutes</li>
                  </ul>
                  <p>Instructions:</p>
                  <ul>
                    <li>
                      <b>Read Carefully:</b> Take your time to read each
                      question thoroughly.
                    </li>
                    <li>
                      <b>Answering:</b> Provide your answers in the allocated
                      spaces or select the correct option.
                    </li>
                    <li>
                      <b>Time Management:</b> Keep an eye on the timer. Manage
                      your time wisely to answer all questions within the
                      allocated {totalTime}
                      minutes.
                    </li>
                    <li>
                      <b>Submission:</b> Once you've completed all questions or
                      when the timer runs out, click "Submit" to view your
                      results.
                    </li>
                  </ul>
                  <p>Good Luck &#128512;</p>
                  <div className="submitBtn">
                    <button onClick={createSession}>
                      <Link to={`/testPage/${topicNameData}`}>Start Quiz</Link>
                    </button>
                  </div>

                  {/* <p>{dummy.question}</p> */}
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
