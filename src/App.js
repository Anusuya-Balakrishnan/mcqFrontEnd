import React, { createContext, useState, useContext } from "react";
import "./App.css";

import { Home } from "./components/home/Home";
import Login from "./components/login/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Signup } from "./components/signup/Signup";
import { TopList } from "./components/topicList/TopList";
import { QuestionPage } from "./components/questionPage/QuestionPage";
import { TopContent } from "./components/topContent/TopContent";
import { TestInstruction } from "./components/testInstruction/TestInstruction";
import { ResultPage } from "./components/resultPage/ResultPage";
import { MyContextProvider } from "./components/MyContext.jsx";
// import { createContext } from "react";
import Context from "./components/Context.jsx";

function App() {
  const contextValue = useContext(Context);
  const [questions, setQuestions] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider value={{ questions, setQuestions }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/topList/:id" element={<TopList />} />
            <Route path="/content/:id" element={<TopContent />} />
            <Route
              path="/testInstruction/:languageId/:topicId/:topicName"
              element={<TestInstruction />}
            />
            <Route path="/testPage/:topicName" element={<QuestionPage />} />
            <Route path="/resultPage" element={<ResultPage />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
{
  /* <Home /> */
}
{
  /* <Signup /> */
}
{
  /* <TopList /> */
}
{
  /* <Navbar /> */
}
{
  /* <QuestionPage /> */
}
{
  /* <TopContent /> */
}
{
  /* <TestInstruction /> */
}
{
  /* <ResultPage /> */
}
