import React from "react";

import questionPage from "./questionPage.css";
export function QuestionPage() {
  return (
    <section class="question-page">
      <div class="question-page__title">topic</div>
      <div class="question-page__body">
        <div class="question-page-content">
          <form id="questionForm">
            <span class="questionNumber"> currentQuestion </span>
            <span class="question-page-content__questions">
              currentQuestion.question
            </span>
            <div class="question-page-content__optionParent">
              <div class="question-page-content__options">
                <input
                  type="radio"
                  name="option"
                  class="option"
                  value="{{currentQuestion.option1}}"
                />
                <p>currentQuestion.option1</p>
              </div>
              <div class="question-page-content__options">
                <input
                  type="radio"
                  name="option"
                  class="option"
                  value="{{currentQuestion.option2}}"
                />
                <p>currentQuestion.option2</p>
              </div>

              <div class="question-page-content__options">
                <input
                  type="radio"
                  name="option"
                  class="option"
                  value="{{currentQuestion.option3}}"
                />
                <p>currentQuestion.option3</p>
              </div>
              <div class="question-page-content__options">
                <input
                  type="radio"
                  name="option"
                  class="option"
                  value="{{currentQuestion.option4}}"
                />
                <p>currentQuestion.option4</p>
              </div>
            </div>
            <input
              type="hidden"
              class="correctAnswer"
              value="{{currentQuestion.answer}}"
            />
            <button
              type="button"
              class="question-page-content__submit"
              name="submit"
            >
              <input type="hidden" class="resultElement" />
              <a href=""> next </a>
            </button>
          </form>
        </div>
        <div class="question-page__question-list">
          <div class="question-page__each-question__time">
            <p>Time</p>
            <div class="exact-time">00 mins:58 sec</div>
          </div>
          <div class="question-page__each-questionNo-parent">
            <p>Question Palatte:</p>
            <div class="question-page__each-question__no"></div>
          </div>
          <div class="question-page__instruction">
            <div class="question-page__instruction1">
              <button></button>
              <p>Answered</p>
            </div>
            <div class="question-page__instruction2">
              <button></button>
              <p>Not Visited</p>
            </div>
            <div class="question-page__instruction3">
              <button></button>
              <p>Not Answered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
