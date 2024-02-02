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
import { AiOutlineMenu } from "react-icons/ai";

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
        <ul className="mcq_secondChild">
          <li className="mcq_subchild">
            <span>Dashboard</span>
          </li>
          <li className="mcq_subchild">
            <span
              onClick={() => {
                navigate("/leaderBoardPage");
              }}
            >
              Leader Board
            </span>
            <img src={medal} alt="medal" />
          </li>
          <li className="mcq_subchild mcq_personProfile">
            <span> {userName[0].toUpperCase() + userName.slice(1)} </span>
            <span className="icon">
              <MdKeyboardArrowDown />
            </span>
            <ul>
              <li>Edit Profile</li>
              <li onClick={logoutFunction}>Logout</li>
            </ul>
          </li>
        </ul>
        <div className="sideMenu">
          <AiOutlineMenu />
          <ul className="sideMenu_option">
            <li>Dashboard</li>
            <li
              onClick={() => {
                navigate("/leaderBoardPage");
              }}
            >
              LeaderBoard
            </li>
            <li>Edit Profile</li>
            <li onClick={logoutFunction}>Logout</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="MCQ-sidebar">
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
    </div>
  </div>
</div>; */
}
