import React from "react";
import DogList from "./DogList"; // Import the DogList component

const Home = () => {
  // Sample data for dogs (replace with your actual data)
  const dogs = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      age: 3,
    },
    {
      id: 2,
      name: "Max",
      breed: "German Shepherd",
      age: 2,
    },
    // Add more dog objects as needed
  ];

  return (
    <div>
      <h1>Welcome to the Dog App</h1>
      {/* Render the DogList component with the list of dogs */}
      <DogList dogs={dogs} />
    </div>
  );
};

export default Home;
