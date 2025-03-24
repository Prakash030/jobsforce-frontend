import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
// import Signup from "./components/Signup";
// import ResumeUpload from "./components/ResumeUpload";
// import JobRecommendation from "./components/JobRecommendation";

function App() {
  return (
    <Router>
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/jobs-recommendation" element={<JobsRecommendation />} /> */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
