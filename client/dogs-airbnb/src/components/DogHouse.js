import React, { useState, useEffect } from 'react';
import DogHouseCard from './DogHouseCard';

function DogHouse(props) {
  const [dogHouse, setDogHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDogHouseDetails = async () => {
      try {
        const response = await fetch(`/api/doghouses/${props.match.params.id}`);
        
        if (response.ok) {
          const dogHouseData = await response.json();
          setDogHouse(dogHouseData);
        } else {
          console.error('Error fetching dog house details');
        }
      } catch (error) {
        console.error('Error fetching dog house details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDogHouseDetails();
  }, [props.match.params.id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!dogHouse) {
    return <div>Dog house not found</div>;
  }

  return (
    <div>
      <DogHouseCard dogHouse={dogHouse} />
    </div>
  );
}

export default DogHouse;
