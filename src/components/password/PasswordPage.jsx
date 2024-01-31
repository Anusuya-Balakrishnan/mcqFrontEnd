import React, { useEffect, useState, useRef, useContext } from "react";
import ReactDOM from "react-dom/client";
import Context from "../Context";

import login from "../login/login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";
import { Home } from "../home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PasswordPage() {
  const { registerId, setRegisterId } = useContext(Context);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const userRef = useRef();
  const errorRef = useRef();
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [erMessage, setError] = useState("");

  useEffect(() => {
    console.log("registerId", registerId);
  }, []);
  const navigateSignup = () => {
    navigate("/signup");
  };

  const result = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/mcq/userLogin/",
        { oceanRegisterNo: registerId, password: password }
      );
      setPassword("");
      setError(false);
      if (response?.data?.message) {
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("username", response?.data?.studentName);
        navigate("/home");
        setSuccess(true);
        setToken(response?.data?.token);
      }

      // setToken(response?.data?.token);
      // setError(false);
    } catch (error) {
      setPassword("");
      setError(true);
    }
  };

  return (
    <div>
      <>
        {localStorage.getItem("token") != null ? (
          <section>
            <Home />
          </section>
        ) : (
          <section>
            <div className="home-page">
              <div className="home-page__logo">
                <img src={oaLogo} alt="" />
              </div>
              <div className="home-page__signin-box">
                <form onSubmit={result}>
                  <div className="home-page__sigin-box-title">SIGN IN</div>

                  <div className="home-page__sigin-box-middleBox">
                    <input
                      type="password"
                      ref={userRef}
                      onChange={(e) => {
                        setPassword(e.target.value.toUpperCase());
                      }}
                      placeholder="Enter Password"
                      name="password"
                      value={password}
                      autoComplete="OFF"
                      required
                    />
                    <br />
                    <p
                      style={{
                        color: "red",
                        display: erMessage ? "block" : "none",
                      }}
                    >
                      InCorrect Password
                    </p>
                  </div>
                  <div className="sigin-box__button">
                    <button className="button">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </>
    </div>
  );
}

export default PasswordPage;
