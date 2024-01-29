import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import resultPage from "./resultPage.css";
import Login from "../login/Login";
import axios from "axios";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Navbar } from "../navbar/Navbar";
export function ResultPage() {
  const { questions, setQuestions, question_id, setQuestion_id } =
    useContext(Context);
  const [resultValue, setResultValue] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/mcq/get_resultData/`,
          {
            resultData: question_id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );

        setResultValue(response?.data?.result);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (question_id) {
      console.log("function calling");
      fetchData(); // Call the async function immediately
    } else {
      navigate("/");
    }
  }, [question_id]);

  useEffect(() => {
    console.log("resultValue", resultValue);
  }, [resultValue]);

  function backButtonNavigate() {
    navigate("/");
  }
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Navbar />
          <section class="resultPage">
            <div class="result__title">
              {resultValue ? resultValue.topicName : ""}
            </div>
            <div class="resultPage__body">
              <div class="resultPage__body_list">
                <p>Test Instructions:</p>
                <ul>
                  <li>
                    No of Correct Answer:{" "}
                    {resultValue ? resultValue.correctAnswerCount : ""}{" "}
                  </li>
                  <li>
                    No of Wrong Answer:{" "}
                    {resultValue ? resultValue.wrongAnswerCount : ""}{" "}
                  </li>
                </ul>
              </div>
              <div class="resultPage__body_image">
                <div class="resultPage_value">
                  {" "}
                  {resultValue
                    ? (resultValue.correctAnswerCount /
                        (resultValue.correctAnswerCount +
                          resultValue.wrongAnswerCount)) *
                      100
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
        <Login />
      )}
    </>
  );
}
