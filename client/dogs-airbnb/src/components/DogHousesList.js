import React, { useEffect, useState } from 'react';

const DogHousesList = ({ searchTerm }) => {
  const [dogHouses, setDogHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = 'http://localhost:3001/dog_houses';

    // Append search query if present
    if (searchTerm) {
      url += `?search=${searchTerm}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch dog houses');
        }
        return response.json();
      })
      .then(data => {
        setDogHouses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dog houses', error);
        setError('Failed to fetch dog houses. Please try again later.');
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(dogHouses) || dogHouses.length === 0) {
    return <p>No dog houses available.</p>;
  }

  // Filter dogHouses based on searchTerm
  const filteredDogHouses = searchTerm
    ? dogHouses.filter(dogHouse => dogHouse.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : dogHouses;

  return (
    <div>
      <h1 className='dog-houses-title'>Dog Houses</h1>
      <div className="dog-houses-list">
        {filteredDogHouses.map(dogHouse => (
          <div key={dogHouse.id} className="dog-house-card">
            <img src={dogHouse.image_url} alt={dogHouse.name} />
            <h2>{dogHouse.name}</h2>
            <p>Address: {dogHouse.address}</p>
            <p>Average Rating: {dogHouse.average_rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogHousesList;