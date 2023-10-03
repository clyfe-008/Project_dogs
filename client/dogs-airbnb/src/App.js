import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import './styles/Home.css';
import  './styles/NavBar.css';
function App() {
  return (
    <div>
      <NavBar/>
      <Home/>
      <SearchBar/>
      <Review/>
     </div>
  );
}

export default App;
