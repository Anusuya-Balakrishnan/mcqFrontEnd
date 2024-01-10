import React from "react";
import ReactDOM from "react-dom/client";
import home from "./home.css";
import dhoni from "./images/dhoni.jpg";
import oaLogo from "./images/oceanacademy Logo.svg";
import medal from "./images/medal.svg";
export function Navbar() {
  return (
    <section class="MCQListPage">
      <div class="MCQ-Navbar">
        <div class="MCQ-logo">
          <img src={oaLogo} alt="" />
        </div>
        <div class="MCQ-sidebar">
          <div class="MCQ-userProfile-side">
            <div class="MCQ-userProfile">
              <p> userName </p>
              <div class="MCQ-userProfile__image">
                <img src={dhoni} alt="userImage" />
              </div>
            </div>
            <div class="MCQ-userProfile__options">
              <div class="editOption">
                <a href="{% url 'signup'%}"> Edit Profile </a>
              </div>
              <div class="logoutOption">
                <a href="{% url 'logout' %}">Logout</a>
              </div>

              <div class="logoutOption">
                <a href="">Exit Test</a>
              </div>
            </div>
            <div class="MCQ-userProfile__leaderBoard">
              <a href="">Leader Board</a>
              <img src={medal} alt="medal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
