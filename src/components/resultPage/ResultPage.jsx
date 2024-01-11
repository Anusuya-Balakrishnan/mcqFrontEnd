import React from "react";
import resultPage from "./resultPage.css";
import { FaAngleDoubleLeft } from "react-icons/fa";
export function ResultPage() {
  return (
    <section class="resultPage">
      <div class="result__title">Data types:</div>
      <div class="resultPage__body">
        <div class="resultPage__body_list">
          <p>Test Instructions:</p>
          <ul>
            <li>No of Correct Answer: correctCount </li>
            <li>No of Wrong Answer: wrongCount </li>
            <li>No of Questons Skipped: skippedCount </li>
          </ul>
        </div>
        <div class="resultPage__body_image">
          <div class="resultPage_value"> percentage %</div>
          <div class="resultPage__body_circle"></div>
        </div>
      </div>
      <div class="back_button">
        <FaAngleDoubleLeft />
      </div>
    </section>
  );
}
