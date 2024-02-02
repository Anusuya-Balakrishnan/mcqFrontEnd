import React, { useEffect, useState } from "react";
import leaderboard from "./leaderboard.css";
import Login from "../login/Login";
import axios from "axios";
import { Navbar } from "../navbar/Navbar";
function LeaderBoardPage() {
  const [resultData, setResultData] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/mcq/leaderBoardApi/`,

          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );

        setResultData(response?.data?.message);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);
  useEffect(() => {
    // Assuming "currentUser" is a boolean property in resultData
    setCurrentUserData(
      resultData && resultData.filter((item) => item.currentUser)
    );

    // Now currentUserData contains an array with only the current user's data
  }, [resultData]);
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Navbar />
          <section className="leaderboardPage">
            <div className="leaderboardHeading">
              <div className="leaderboardHeading_title">LeaderBoard</div>
              {/* <div className="leaderboardHeading_subtitle">
                Top {resultData ? resultData.length : ""} Users in the
                Community.
              </div> */}
            </div>
            <div className="leaderboard_table">
              <div className="leaderboard_table_heading">
                <div>Rank</div>
                <div>User</div>
                <div>Points</div>
              </div>
              {currentUserData
                ? currentUserData.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="leaderboard_item2 currentUser">
                        <div>{index + 1}</div>
                        <div>
                          {item.username[0].toUpperCase() +
                            item.username.slice(1)}{" "}
                          (Current Student)
                        </div>
                        <div>{item.result}</div>
                      </div>
                    </React.Fragment>
                  ))
                : ""}

              {resultData ? (
                resultData.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="leaderboard_item2">
                        <div>{index + 1}</div>
                        <div>
                          {item.username[0].toUpperCase() +
                            item.username.slice(1)}
                        </div>
                        <div>{item.result}</div>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <div>No data available</div>
              )}
            </div>
          </section>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default LeaderBoardPage;
