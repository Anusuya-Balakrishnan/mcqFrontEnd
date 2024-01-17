import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import testList from "./testList.css";
import pythonLogo from "./image/pythonLogo.svg";
import light from "./image/light.svg";
import { Navbar } from "../navbar/Navbar";
import axios from "axios";
import Login from "../login/Login";
export function TopList() {
  const [data, setData] = useState([]);
  const [languageList, setlanguageList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/mcq/get_language/`,
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
    // console.log("data", data);
    const array = [];
    for (let eachData of data) {
      array.push(eachData.languageName);
    }
    // console.log(array);
    setlanguageList(array);
  }, [data]);
  useEffect(() => {
    console.log(languageList);
  }, [languageList]);

  // let { id } = useParams();
  // console.log("path=" + id);
  // var courseObject = syllabusList[id];
  // console.log("courseObject" + courseObject.title);

  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          <div class="mcqTestList__Title">MCQ'S Test List</div>
          <div class="MCQTest__Box-parent">
            {languageList.map((item, index) => (
              <div className="MCQ-list__Each-test">
                <a href="" key={index}>
                  <div class="MCQTest__Box">
                    <div class="MCQTest__Box-title">
                      <div class="MCQTest__Box-title__image">
                        <img src={pythonLogo} alt="python logo" />
                      </div>

                      <p>{item} MCQs</p>
                    </div>
                    <div class="MCQTest__Box-content">
                      <p>Average Score: 4</p>
                      <p>No of Person Attended : 2502</p>
                      <p>
                        <img src={light} alt="light" /> Beginner
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
