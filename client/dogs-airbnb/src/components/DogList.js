import React from "react";

function DogList({ dogs }) {
  return (
    <div>
      <h2>List of Dogs</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            {/* Add more dog information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogList;
