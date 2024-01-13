import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import signup from "./signup.css";
import profileImage from "./image/personprofile.svg";
import axios from "axios";
import { Home } from "../home/Home";
export function Signup() {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [nationality, setNationality] = useState("");
  const [workingDesignation, setWorkingDesignation] = useState(null);
  const [collegeName, setCollegeName] = useState(null);
  const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [gender, setGender] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    var retrievedToken = localStorage.getItem("token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("username");
    if (retrievedToken != undefined) {
      setToken(retrievedToken);
      console.log("retrievedToken", retrievedToken);
    }
  }, []);
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/mcq/users/", {
        name: userName,
        date: date,
        dob: dob,
        mobileNumber: mobileNumber,
        address: address,
        qualification: qualification,
        nationality: nationality,
        workingDesignation: workingDesignation,
        studentCollegeName: collegeName,
        email: email,
        whatsappNumber: whatsappNumber,
        gender: gender,
      });
      setToken(response.data.token);
      setSuccess(true);
      setUserName("");
      setAddress("");
      setCollegeName("");
      setDate("");
      setDob("");
      setEmail("");
      setMobileNumber("");
      setQualification("");
      setWorkingDesignation("");
      setWhatsappNumber("");
      setGender("");
      setNationality("");

      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("username", response?.data?.user?.name);
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
          <h1 class="sign-up-heading">Create Account</h1>
          <div class="sign-up-block">
            <form onSubmit={addUser}>
              <div class="sign-up-block-form">
                <div class="sign-up-block-form-content">
                  <input
                    className="signup-Input"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="date"
                    // onfocus="(this.type='datetime-local')"
                    // onblur="(this.type='text')"
                    placeholder="Date"
                    name="date"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    // value={date}
                    value="date of birth"
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="email"
                    placeholder="Email Id"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name={email}
                    required
                  />
                  <br />
                  <input
                    type="date"
                    className="signup-Input"
                    placeholder="Date Of Birth"
                    name="dob"
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                    value={dob}
                    // onfocus="(this.type='date')"
                    // onblur="(this.type='text')"
                    required
                  />
                  <br />
                  <input
                    type="tel"
                    class="signup-Input"
                    placeholder="Mobile Number"
                    name="mobileNumber"
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                    value={mobileNumber}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    value={address}
                    required
                  />
                </div>
                <div class="sign-up-block-form-content">
                  <input
                    className="signup-Input"
                    type="text"
                    placeholder="Qualification"
                    name="qualification"
                    onChange={(e) => {
                      setQualification(e.target.value);
                    }}
                    value={qualification}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="text"
                    placeholder="Nationality"
                    name="nationality"
                    onChange={(e) => {
                      setNationality(e.target.value);
                    }}
                    value={nationality}
                    required
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="text"
                    placeholder="Working Designation"
                    name="workingDesignation"
                    onChange={(e) => {
                      setWorkingDesignation(e.target.value);
                    }}
                    value={workingDesignation}
                  />
                  <br />
                  <input
                    type="text"
                    className="signup-Input"
                    placeholder="College Name(if Student)"
                    name="collegeName"
                    onChange={(e) => {
                      setCollegeName(e.target.value);
                    }}
                    value={collegeName}
                  />
                  <br />
                  <input
                    type="tel"
                    class="signup-Input"
                    placeholder="Whatsapp Number"
                    name="whatsappNumber"
                    required
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                    }}
                    value={whatsappNumber}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    value={gender}
                    required
                  />
                </div>
                <div class="sign-up-block-form-image">
                  <img
                    src={profileImage}
                    alt="personprofile"
                    name="profileImage"
                  />
                  <div class="sign-up-form-image-upload">+</div>
                </div>
              </div>
              <div class="sign-up__button">
                <button class="btn">Sign Up</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
