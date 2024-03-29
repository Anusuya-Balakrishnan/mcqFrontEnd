import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom/client";
import testList from "./testList.css";
import pythonLogo from "./image/pythonLogo.svg";
import light from "./image/light.svg";
import { Navbar } from "../navbar/Navbar";
import axios from "axios";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
export function TopList() {
  const [data, setData] = useState([]);
  const [languageList, setlanguageList] = useState([]);
  const navigate = useNavigate();
  // getting value from useParams
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/mcq/get_language/${id}/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );

        setData(response?.data?.languages);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  useEffect(() => {
    const array = [];
    for (let eachData of data) {
      array.push(eachData);
    }

    setlanguageList(array);
  }, [data]);

  const contentNavigate = (id) => {
    navigate(`/content/${id}`);
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          <section className="mcqTestList">
            <div class="mcqTestList__Title">
              <h1>Explore Topics</h1>
              <p>Choose a Language to Dive Deeper:</p>
            </div>
            <div class="MCQTest__Box-parent">
              {languageList.map((item, index) => (
                <div className="MCQ-list__Each-test">
                  <div
                    key={index}
                    onClick={() => {
                      contentNavigate(item.id);
                    }}
                  >
                    <div class="MCQTest__Box">
                      <div class="MCQTest__Box-title">
                        <div class="MCQTest__Box-title__image">
                          <img src={pythonLogo} alt="python logo" />
                        </div>

                        <p>{item.languageName} MCQs</p>
                      </div>
                      <div class="MCQTest__Box-content">
                        <p>Average Score: 4</p>
                        <p>No of Person Attended : 2502</p>
                        {/* <p>
                          <img src={light} alt="light" /> Beginner
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
