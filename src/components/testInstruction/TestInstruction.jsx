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
  const { questions, setQuestions } = useContext(Context);
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
  }, [time]);
  useEffect(() => {
    console.log(questions);
  }, [time]);
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          <section>
            <div className="instruction-page">
              <div className="instruction-page__content">
                <div className="instruction-page__title">{topicName}</div>
                <div className="instruction-page__content_details">
                  <p>Test Instructions</p>
                  <ul>
                    <li>Total Number of Questions: {totalQuestions}</li>
                    <li>Each Questions carries 1 mark</li>
                    <li>Time Allocated: {totalTime} minutes</li>
                  </ul>
                  <button>
                    <Link to={`/testPage/${topicNameData}`}>Start Test</Link>
                  </button>

                  {/* <p>{dummy.question}</p> */}
                </div>
              </div>
              <div className="instruction-page_image">
                <img src={testInstructionImage} alt="" />
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
