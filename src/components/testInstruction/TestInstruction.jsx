import React from "react";
import testInstruction from "./testInstruction.css";
import testInstructionImage from "./image/testInstruction.svg";

export function TestInstruction() {
  return (
    <section>
      <div class="instruction-page">
        <div class="instruction-page__content">
          <div class="instruction-page__title">topic</div>
          <div class="instruction-page__content_details">
            <p>Test Instructions</p>
            <ul>
              <li>Total Number of Questions: noQuestions</li>
              <li>Each Questions carries 1 mark</li>
              <li>Time Alloted: time minutes</li>
            </ul>
            <button>
              <a href="">Start Test</a>
            </button>
          </div>
        </div>
        <div class="instruction-page_image">
          <img src={testInstructionImage} alt="" />
        </div>
      </div>
    </section>
  );
}
