import React, { useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import SignUpForm from "./components/SignUpForm"
import DogHouse from "./components/DogHouse";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm"; // Import the LoginForm component
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import BrowserRouter, Routes, and Navigate

import "./styles/Home.css";
import "./styles/NavBar.css";
import "./styles/Review.css";
import "./styles/SearchBar.css";

const App = () => {
  const handleSearch = (searchTerm) => {
    // Perform the search logic based on the search term (e.g., fetch dog houses)
    console.log("Search term:", searchTerm);
  };

  // State to track the login status (true for logged in, false for logged out)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = (formData) => {
    // Simulate login logic (you should replace this with your actual login logic)
    if (formData.email === "user@example.com" && formData.password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <SearchBar onSearch={handleSearch} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/doghouses/:id" element={<DogHouse />} />
          <Route
            path="/reviews"
            element={
              isLoggedIn ? (
                <Review />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginForm onLogin={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
