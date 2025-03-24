import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import ResumeUpload from "./components/ResumeUploader";
// import ResumeUpload from "./components/ResumeUpload";
// import JobRecommendation from "./components/JobRecommendation";

function App() {
  return (
    <Router>
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploader" element={<ResumeUpload />} />
        {/* <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/jobs-recommendation" element={<JobsRecommendation />} /> */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
