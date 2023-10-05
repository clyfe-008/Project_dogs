import React, { useState } from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import DogHouse from "./components/DogHouse";
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import BrowserRouter, Routes, and Navigate

import './styles/Home.css';
import './styles/NavBar.css';
import './styles/Review.css';
import './styles/SearchBar.css';

const App = () => {
    const handleSearch = (searchTerm) => {
        // Perform the search logic based on the search term (e.g., fetch dog houses)
        console.log('Search term:', searchTerm);
    };

    // State to track the selected item (review)
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div>
            <NavBar />
            <SearchBar onSearch={handleSearch} />
            <Router>
                <Routes>
                    <Route path="/" element={<Home selectedItem={selectedItem} />} />
                    <Route path="/doghouses/:id" element={<DogHouse />} />
                    <Route
                        path="/reviews"
                        element={<Review selectedItem={selectedItem} onItemSelected={setSelectedItem} />}
                    />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
