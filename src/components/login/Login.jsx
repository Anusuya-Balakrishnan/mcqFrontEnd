import React from "react";
import ReactDOM from "react-dom/client";
import login from "./login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";
export function Login() {
  return (
    <div class="home-page">
      <div class="home-page__logo">
        <img src={oaLogo} alt="" />
      </div>
      <div class="home-page__signin-box">
        <form method="POST">
          <div class="home-page__sigin-box-title">SIGN IN</div>
          <input type="telephone" placeholder="Enter Email Id" name="emailId" />
          <br />
          <div class="sigin-box__button">
            <button>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}
