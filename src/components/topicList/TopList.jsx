import React from "react";
import ReactDOM from "react-dom/client";
import testList from "./testList.css";
import pythonLogo from "./image/pythonLogo.svg";
import light from "./image/light.svg";
import { Navbar } from "../navbar/Navbar";
export function TopList() {
  return (
    <section>
      <Navbar />
      <div class="mcqTestList__Title">MCQ'S Test List</div>
      <div class="MCQTest__Box-parent">
        <a href="">
          <div class="MCQTest__Box">
            <div class="MCQTest__Box-title">
              <div class="MCQTest__Box-title__image">
                <img src={pythonLogo} alt="python logo" />
              </div>

              <p> MCQs</p>
            </div>
            <div class="MCQTest__Box-content">
              <p>Average Score: 4</p>
              <p>No of Person Attended : 2502</p>
              <p>
                <img src={light} alt="light" /> Beginner
              </p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
