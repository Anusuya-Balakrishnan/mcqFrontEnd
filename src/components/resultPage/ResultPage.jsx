import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import resultPage from "./resultPage.css";
import Login from "../login/Login";
import axios from "axios";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Navbar } from "../navbar/Navbar";
import { ClipLoader } from "react-spinners";

export function ResultPage() {
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
  const [resultValue, setResultValue] = useState();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://127.0.0.1:8000/mcq/get_resultData/`,
  //         {
  //           resultData: question_id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Token ${localStorage.getItem("token")}`,
  //             // You can include other headers as needed
  //           },
  //         }
  //       );
  //       console.log(response?.data?.result);

  //       setResultValue(response?.data?.result);
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //     console.log("isUserActive", isUserActive);
  //   };
  //   if (question_id) {
  //     fetchData(); // Call the async function immediately
  //   } else {
  //     navigate("/");
  //   }
  // }, [question_id]);

  function backButtonNavigate() {
    navigate("/");
  }

  useEffect(() => {
    const handlePopstate = (event) => {
      // Check if you are at a specific route or condition
      // In this example, it checks if the current path is "/questionPage"
      if (window.location.pathname === "/resultPage") {
        // Replace "/resultPage" with the route you want to navigate to
        navigate("/home");
      }
      // Add additional conditions if needed
    };

    // Add the event listener for popstate
    window.addEventListener("popstate", handlePopstate);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [navigate]); // Make sure to include navigate in the dependency array

  return (
    <>
      {localStorage.getItem("token") ? (
        resultContent ? (
          <>
            <Navbar />
            <section class="resultPage">
              <div class="result__title">
                {resultContent ? resultContent.topicName : ""}
              </div>
              {!newUserToQuiz && (
                <div style={{ color: "red" }}>
                  You Already Completed the quiz in this topic
                </div>
              )}
              <div class="resultPage__body">
                <div class="resultPage__body_list">
                  <p>Test Instructions:</p>
                  <ul>
                    <li>
                      No of Correct Answer:
                      {resultContent ? resultContent.correctCount : ""}
                    </li>
                    <li>
                      No of Wrong Answer:
                      {resultContent ? resultContent.wrongCount : ""}
                    </li>
                  </ul>
                </div>
                <div class="resultPage__body_image">
                  <div class="resultPage_value">
                    {" "}
                    {resultContent
                      ? parseInt(
                          (resultContent.correctCount /
                            (resultContent.correctCount +
                              resultContent.wrongCount)) *
                            100
                        )
                      : ""}{" "}
                    %
                  </div>
                  <div class="resultPage__body_circle"></div>
                </div>
              </div>
              <div class="back_button" onClick={backButtonNavigate}>
                <FaAngleDoubleLeft />
              </div>
            </section>
          </>
        ) : (
          <ClipLoader color="#36D7B7" />
        )
      ) : (
        <Login />
      )}
    </>
  );
}
