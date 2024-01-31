import React, { useEffect, useState, useRef, useContext } from "react";
import ReactDOM from "react-dom/client";
import Context from "../Context";
import { Link } from "react-router-dom";
import login from "./login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";
import { Home } from "../home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { registerId, setRegisterId } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const userRef = useRef();
  const errorRef = useRef();

  const [erMessage, setError] = useState("");

  const navigateSignup = () => {
    navigate("/signup");
  };
  // useEffect(() => {
  //   userRef.current.focus();
  // });
  // useEffect(() => {
  //   var retrievedToken = localStorage.getItem("token");
  //   // localStorage.removeItem("token");
  //   // localStorage.removeItem("username");
  //   if (retrievedToken != undefined) {
  //     setToken(retrievedToken);
  //     console.log("retrievedToken", retrievedToken);
  //   }
  // }, []);

  const result = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/mcq/custom_user_check/",
        { oceanRegisterNo: user }
      );
      if (response?.data?.message) {
        setRegisterId(user);
        setError(false);
        navigate("/passwordPage");
      } else {
        setError(true);
      }
      setUser("");
      // localStorage.setItem("token", response?.data?.token);
      // localStorage.setItem("username", response?.data?.user?.studentName);
      // setToken(response?.data?.token);
      // setError(false);
    } catch (error) {
      setUser("");
      setError(true);
    }
  };

  return (
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
                    type="text"
                    ref={userRef}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    placeholder="Enter Ocean Register No"
                    name="oceanRegisterNo"
                    value={user}
                    autoComplete="OFF"
                    required
                  />
                  <br />
                  <p
                    style={{
                      color: "red",
                      display: erMessage ? "block" : "none",
                      paddingBottom: "10px",
                    }}
                  >
                    Invalid Register No
                  </p>
                  <div className="signup_box">
                    Don't you have Account?{" "}
                    <a onClick={navigateSignup}>Sign Up</a>
                  </div>
                </div>
                <div className="sigin-box__button">
                  <button className="button">Next</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
