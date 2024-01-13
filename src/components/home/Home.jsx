import React from "react";
import ReactDOM from "react-dom/client";
import home from "./home.css";
import { Navbar } from "../navbar/Navbar";
export function Home() {
  return (
    <div className="Homepage">
      <Navbar />
      <div className="MCQListPage__body">
        <div className="MCQListPage__title">MCQ'S List</div>
        <div className="MCQ-lists">
          <div className="MCQ-list__Each-test">
            <a href=""> MCQ's</a>
          </div>
        </div>
      </div>
    </div>
  );
}
// export default Home;
