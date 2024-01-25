import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import home from "./home.css";
import { Navbar } from "../navbar/Navbar";
import Login from "../login/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Home() {
  // const array = ["Programming", "Testing"];
  const [data, setData] = useState([]);
  const [mcqList, setMcqList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/mcq/get_mcqList/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );

        setData(response?.data?.mcqList);
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
      array.push(eachData);
    }
    // console.log(array);
    setMcqList(array);
  }, [data]);
  useEffect(() => {
    console.log(mcqList);
  }, [mcqList]);

  const userNavigate = (id) => {
    navigate(`/topList/${id}`);
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="Homepage">
          <Navbar />
          <div className="MCQListPage__body">
            <div className="MCQListPage__title">MCQ'S List</div>
            <div className="MCQ-lists">
              {mcqList.map((item, index) => (
                <div className="MCQ-list__Each-test">
                  <div
                    key={index}
                    onClick={() => {
                      userNavigate(item.id);
                    }}
                  >
                    {item.mcqName} MCQ's
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
// export default Home;
