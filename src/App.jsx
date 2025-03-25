import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import ResumeUpload from "./components/ResumeUploader";
import JobRecommendations from "./components/JobRecommendationCard";

function AppContent() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploader" element={<ResumeUpload />} />
        <Route path="/jobs" element={<JobRecommendations />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;