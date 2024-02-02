import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import signup from "./signup.css";
import profileImage from "./image/personprofile.svg";
import axios from "axios";
import { Home } from "../home/Home";
export function Signup() {
  const [userName, setUserName] = useState("");
  const [oceanRegisterNo, setOceanRegisterNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const userRef = useRef(null);
  useEffect(() => {
    var retrievedToken = localStorage.getItem("token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("username");
    if (retrievedToken != undefined) {
      setToken(retrievedToken);
      console.log("retrievedToken", retrievedToken);
    }
  }, []);
  useEffect(() => {
    // Focus on the input element when the component mounts
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/mcq/users/", {
        studentName: userName,
        mobileNumber: mobileNumber,
        oceanRegisterNo: oceanRegisterNo,
        email: email,
        password: password,
      });
      setToken(response.data.token);
      setSuccess(true);
      setUserName("");
      setOceanRegisterNo("");
      setMobileNumber("");
      setEmail("");
      setConfirmPassword("");
      setPassword("");

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("username", response?.data?.user?.studentName);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      {success || Boolean(token) ? (
        <Home />
      ) : (
        <section id="CreateAccount">
          <div className="sign-up-block">
            <div className="sign-up-heading">
              <h1>Join Us Today!</h1>
              <p>Sign Up Now to Become a Member</p>
            </div>
            <form onSubmit={addUser}>
              <div className="sign-up-block-form">
                <div className="sign-up-block-form-content">
                  <input
                    className="signup-Input"
                    type="text"
                    ref={userRef}
                    placeholder="Ocean Register No"
                    onChange={(e) => {
                      setOceanRegisterNo(e.target.value.toUpperCase());
                    }}
                    value={oceanRegisterNo}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="text"
                    placeholder="Enter your Full Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                    required
                  />
                  <br />

                  <input
                    type="tel"
                    className="signup-Input"
                    placeholder="Enter your Mobile Number"
                    name="mobileNumber"
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                    value={mobileNumber}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="email"
                    placeholder="Enter your Email Id"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name={email}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name={password}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="password"
                    placeholder="Enter Confirm password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    name={confirmPassword}
                    required
                  />
                  <br />
                </div>
              </div>
              <div className="sign-up__button">
                <button className="btn">Sign Up</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

// <div class="sign-up-block-form-content">
//                   <input
//                     className="signup-Input"
//                     type="text"
//                     placeholder="Qualification"
//                     name="qualification"
//                     onChange={(e) => {
//                       setQualification(e.target.value);
//                     }}
//                     value={qualification}
//                     required
//                   />
//                   <br />
//                   <input
//                     className="signup-Input"
//                     type="text"
//                     placeholder="Nationality"
//                     name="nationality"
//                     onChange={(e) => {
//                       setNationality(e.target.value);
//                     }}
//                     value={nationality}
//                     required
//                   />
//                   <br />
//                   <input
//                     className="signup-Input"
//                     type="text"
//                     placeholder="Working Designation"
//                     name="workingDesignation"
//                     onChange={(e) => {
//                       setWorkingDesignation(e.target.value);
//                     }}
//                     value={workingDesignation}
//                   />
//                   <br />
//                   <input
//                     type="text"
//                     className="signup-Input"
//                     placeholder="College Name(if Student)"
//                     name="collegeName"
//                     onChange={(e) => {
//                       setCollegeName(e.target.value);
//                     }}
//                     value={collegeName}
//                   />
//                   <br />
//                   <input
//                     type="tel"
//                     class="signup-Input"
//                     placeholder="Whatsapp Number"
//                     name="whatsappNumber"
//                     required
//                     onChange={(e) => {
//                       setWhatsappNumber(e.target.value);
//                     }}
//                     value={whatsappNumber}
//                   />
//                   <br />
//                   <input
//                     type="text"
//                     placeholder="Gender"
//                     name="gender"
//                     onChange={(e) => {
//                       setGender(e.target.value);
//                     }}
//                     value={gender}
//                     required
//                   />
//                 </div>
//                 <div class="sign-up-block-form-image">
//                   <img
//                     src={profileImage}
//                     alt="personprofile"
//                     name="profileImage"
//                   />
//                   <div class="sign-up-form-image-upload">+</div>
//                 </div>
