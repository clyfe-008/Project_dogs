import React from 'react';
//import './DogHouseCard.css'; 

function DogHouseCard({ dogHouse }) {
  return (
    <div className="dog-house-card">
      <h2>{dogHouse.name}</h2>
      <p>Address: {dogHouse.address}</p>
      <p>Average Rating: {dogHouse.average_rating}</p>
    </div>
  );
}

export default DogHouseCard;
