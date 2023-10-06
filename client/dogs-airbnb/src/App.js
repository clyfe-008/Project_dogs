import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Developer from './components/Developer';
import Contact from "./components/Contact";
import About from "./components/About";
import './styles/tailwind.css';
import './styles/Home.css';
import './styles/NavBar.css';
import './styles/Review.css';
import './styles/SearchBar.css';
import './styles/About.css';
import './styles/developer.css'

const App = () => {
  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/developers" element={<Developer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <SearchBar onSearch={handleSearch} />
      <Review />
    </div>
  );
};

export default App;
