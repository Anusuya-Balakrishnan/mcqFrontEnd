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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/topList" element={<TopList />} />
          </Routes>
        </main>
      </BrowserRouter>

      {/* <Home /> */}
      {/* <Signup /> */}
      {/* <TopList /> */}
      {/* <Navbar /> */}
      {/* <QuestionPage /> */}
      {/* <TopContent /> */}
      {/* <TestInstruction /> */}
      {/* <ResultPage /> */}
    </div>
  );
}

export default App;
