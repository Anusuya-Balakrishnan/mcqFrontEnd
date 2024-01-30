import React from "react";
import leaderboard from "./leaderboard.css";
import Login from "../login/Login";
function LeaderBoardPage() {
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <section>
            <div className="LeaderboardHeading">
              <div>LeaderBoard</div>
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
