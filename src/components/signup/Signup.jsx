import React from "react";
import ReactDOM from "react-dom/client";
import signup from "./signup.css";
import profileImage from "./image/personprofile.svg";
export function Signup() {
  return (
    <section id="CreateAccount">
      <h1 class="sign-up-heading">Create Account</h1>
      <div class="sign-up-block">
        <form method="POST">
          <div class="sign-up-block-form">
            <div class="sign-up-block-form-content">
              <input
                class="signup-Input"
                type="text"
                placeholder="First Name"
                name="firstName"
                required
              />
              <br />
              <input
                class="signup-Input"
                type="text"
                placeholder="Last Name"
                name="lastName"
                required
              />
              <br />
              <input
                class="signup-Input"
                type="email"
                placeholder="Email Id"
                name="emailId"
                required
              />
              <br />
              <input
                type="text"
                class="signup-Input"
                placeholder="Date Of Birth"
                name="dob"
                onfocus="(this.type='date')"
                onblur="(this.type='text')"
                required
              />
              <br />
              <input
                type="telephone"
                class="signup-Input"
                placeholder="Mobile Number"
                name="mobileNumber"
                required
              />
            </div>
            <div class="sign-up-block-form-image">
              <img src={profileImage} alt="personprofile" name="profileImage" />
              <div class="sign-up-form-image-upload">+</div>
            </div>
          </div>
          <div class="sign-up__button">
            <button class="btn">Sign Up</button>
          </div>
        </form>
      </div>
    </section>
  );
}
