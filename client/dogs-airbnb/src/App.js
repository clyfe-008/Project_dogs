import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import './styles/Home.css';
import  './styles/NavBar.css';
import './styles/Review.css'
import './styles/SearchBar.css'

const App = () => {
    const handleSearch = (searchTerm) => {
      // Perform the search logic based on the search term (e.g., fetch dog houses)
      console.log('Search term:', searchTerm);
    };
  return (
    <div>
      <NavBar/>
      <Home/>
      <SearchBar onSearch={handleSearch}/>
      <Review/>
     </div>
  );
}

export default App;
