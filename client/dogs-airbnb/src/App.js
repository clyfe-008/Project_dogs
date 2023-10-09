import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import Developer from "./components/Developer";
import Contact from "./components/Contact";
import About from "./components/About";
import DogHousesList from "./components/DogHousesList";
import "./styles/Home.css";
import "./styles/NavBar.css";
import "./styles/Review.css";
import "./styles/SearchBar.css";
import "./styles/About.css";
import "./styles/developer.css";
import './styles/DogHousesList.css'
import './styles/contact.css'
import './styles/Footer.css'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // State to track the login status (true for logged in, false for logged out)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = (formData) => {
    // Simulate login logic (replace this with your actual login logic)
    if (
      formData.email === "user@example.com" &&
      formData.password === "password"
    ) {
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
      <Router>
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
          <Route path="/signup" element={<Signup />} />
          <Route path="/developers" element={<Developer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
      <SearchBar onSearch={handleSearch} />
      <DogHousesList searchTerm={searchTerm} />
      <Footer />
    </div>
  );
};

export default App;
