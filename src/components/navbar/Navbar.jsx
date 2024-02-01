import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import navbar from "./navbar.css";
import dhoni from "./images/dhoni.jpg";
import oaLogo from "./images/oceanacademy Logo.svg";
import newoaLogo from "./images/oaLogo.svg";
import medal from "./images/medal.svg";
import { useNavigate } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import axios from "axios";

export function Navbar() {
  const [userName, setUserName] = useState(localStorage.getItem("username"));
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
        <div
          className="MCQ-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={newoaLogo} alt="" />
        </div>
        <div className="MCQ-sidebar">
          <div className="MCQ-userProfile__leaderBoard">
            <img src={medal} alt="medal" />
            <div
              onClick={() => {
                navigate("/leaderBoardPage");
              }}
            >
              Leader Board
            </div>
          </div>
          <div className="MCQ-userProfile__leaderBoard">
            <div>Dashboard</div>
          </div>

          <div className="MCQ-userProfile-side">
            <div className="MCQ-userProfile">
              <p> {userName[0].toUpperCase() + userName.slice(1)} </p>
              <span>
                <MdKeyboardArrowDown />
              </span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
