import React from "react";
import ReactDOM from "react-dom/client";
import navbar from "./navbar.css";
import dhoni from "./images/dhoni.jpg";
import oaLogo from "./images/oceanacademy Logo.svg";
import medal from "./images/medal.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Navbar() {
  const navigate = useNavigate();
  const logoutFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/mcq/userLogout/`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the authorization token
            // You can include other headers as needed
          },
        }
      );
      console.log("Logout response:", response?.data);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("Deleted successfully:", response?.data?.Message);
      // Refresh the window
      window.location.reload();
    } catch (error) {
      console.error("Error deleting resource:", error);
      // Refresh the window
      window.location.reload();
    }
  };

  return (
    <section className="MCQListPage">
      <div className="MCQ-Navbar">
        <div className="MCQ-logo">
          <img src={oaLogo} alt="" />
        </div>
        <div className="MCQ-sidebar">
          <div className="MCQ-userProfile-side">
            <div className="MCQ-userProfile">
              <p> {localStorage.getItem("username")} </p>
              <div className="MCQ-userProfile__image">
                <img src={dhoni} alt="userImage" />
              </div>
            </div>
            <div className="MCQ-userProfile__options">
              <div className="editOption">
                <div href=""> Edit Profile </div>
              </div>
              <div className="logoutOption" onClick={logoutFunction}>
                <div href="">Logout</div>
              </div>

              {/* <div class="logoutOption">
                <a href="">Exit Test</a>
              </div> */}
            </div>
            <div className="MCQ-userProfile__leaderBoard">
              <div
                onClick={() => {
                  navigate("/leaderBoardPage");
                }}
              >
                Leader Board
              </div>
              <img src={medal} alt="medal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
