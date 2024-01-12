import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import login from "./login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";

import axios from "axios";

export default function Login() {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const userRef = useRef();
  const errorRef = useRef();
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [erMessage, setError] = useState(false);
  axios.defaults.baseURL = "http://127.0.0.1:8000/mcq/";

  useEffect(() => {
    userRef.current.focus();
  });
  function checkCredential(e) {
    e.preventDefault();
    console.log("Hello");
    // axios
    //   .get("http://127.0.0.1:8000/mcq/users/")
    //   .then((response) => {
    //     setData(response.data);
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching data:");
    //   });
    // http://127.0.0.1:8000/mcq/userLogin/
    axios
      .post("http://127.0.0.1:8000/mcq/userLogin/", {
        email: user,
      })
      .then((response) => {
        setData(response.data);
        console.log("data", data);
        setToken(data.token);
        setSuccess(!success);
        setError(!erMessage);
        console.log("token", token);
      })
      .catch((error) => {
        console.error("Error fetching data:");
      });
    console.log(success);
  }
  return (
    <div className="home-page">
      <div className="home-page__logo">
        <img src={oaLogo} alt="" />
      </div>
      <div className="home-page__signin-box">
        <form onSubmit={checkCredential}>
          <div className="home-page__sigin-box-title">SIGN IN</div>

          <input
            type="telephone"
            ref={userRef}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            placeholder="Enter Email Id"
            name="emailId"
            value={user}
            required
          />
          <br />
          <p style={{ color: "red", display: erMessage ? "block" : "none" }}>
            Invalid Credential
          </p>
          <div className="sigin-box__button">
            <Link to={""}>
              <button>Sign in</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
