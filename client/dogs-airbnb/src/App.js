import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Review from "./components/Review";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import Signup from "./components/Signup";
import Developers from "./components/Developers";
import Contact from "./components/Contact";
import About from "./components/About";
import './styles/tailwind.css'
import './styles/Home.css';
import './styles/NavBar.css';
import './styles/Review.css';
import './styles/SearchBar.css';



const App = () => {
  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
  };

  return (
    <div>
     <Router>
          <NavBar/>
             <Switch>
                <Route path="/signup" component={<Signup/>}/>
                <Route path="/developers" component={<Developers/>} />
                <Route path="/contact" component={<Contact/>} />
                <Route path="/about" component={<About/>} />
              </Switch>
              <Home />
              <SearchBar onSearch={handleSearch} />
              <Review />
      </Router>
    </div>
  );
}

export default App;

