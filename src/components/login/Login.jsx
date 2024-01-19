import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import login from "./login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";
import { Home } from "../home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const userRef = useRef();
  const errorRef = useRef();
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [erMessage, setError] = useState("");

  const navigateSignup = () => {
    navigate("/signup");
  };
  // useEffect(() => {
  //   userRef.current.focus();
  // });
  useEffect(() => {
    var retrievedToken = localStorage.getItem("token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("username");
    if (retrievedToken != undefined) {
      setToken(retrievedToken);
      console.log("retrievedToken", retrievedToken);
    }
  }, []);

  const result = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/mcq/userLogin/",
        { email: user }
      );
      setSuccess(true);
      setUser("");
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("username", response?.data?.user?.studentName);
      setToken(response?.data?.token);
      setError(false);
    } catch (error) {
      setUser("");
      setError("No response");
    }
  };
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
      .post("http://127.0.0.1:8000/mcq/userLogin/", {})
      .then((response) => {
        setToken(response.data.token);
        setSuccess(true);
        setError(false);
        setUser("");
        console.log("token", token);
      })
      .catch((error) => {
        console.error("Error fetching data:");
        setSuccess(false);
        setError(true);
      });
    console.log(success);
  }
  return (
    <>
      {success || Boolean(token) ? (
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
                    type="email"
                    ref={userRef}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                    placeholder="Enter Email Id"
                    name="emailId"
                    value={user}
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
                    Invalid Credential
                  </p>
                  <div className="signup_box">
                    Don't you have Account?{" "}
                    <a onClick={navigateSignup}>Sign Up</a>
                  </div>
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
  );
}
