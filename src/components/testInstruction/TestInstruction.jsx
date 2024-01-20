import React, { useEffect, useState, useContext } from "react";
import testInstruction from "./testInstruction.css";
import testInstructionImage from "./image/testInstruction.svg";
import { useParams } from "react-router-dom";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar.jsx";
import axios from "axios";
import MyContext from "../../MyContext.jsx";
export function TestInstruction() {
  const { setQuestions } = useContext(MyContext);
  let { languageId, topicId, topicName } = useParams();
  // console.log(setQuestions);

  const [topicIdData, settopicId] = useState("");
  const [languageIdData, setLanguageIdData] = useState("");
  const [topicNameData, settopicName] = useState("");
  const [responseData, setResponseData] = useState("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalMark, setTotalMark] = useState(0);

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
        // setQuestions(response?.data?.questions);

        setResponseData(response?.data?.questions);

        // setQuestions(responseData);
        // console.log("questions", questions);
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
  });

  const handleClick = () => {
    console.log(responseData);
    setQuestions("Hello");
  };
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
                    <a href="/test" onClick={handleClick}>
                      Start Test
                    </a>
                  </button>
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
