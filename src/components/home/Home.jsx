import React from "react";
import ReactDOM from "react-dom/client";
import home from "./home.css";
import { Navbar } from "../navbar/Navbar";
export function Home() {
  return (
    <div className="Homepage">
      <Navbar />
      <div class="MCQListPage__body">
        <div class="MCQListPage__title">MCQ'S List</div>
        <div class="MCQ-lists">
          <div class="MCQ-list__Each-test">
            <a href=""> MCQ's</a>
          </div>
        </div>
      </div>
    </div>
  );
}
// export default Home;
