import React, { useState, useEffect } from 'react';

const apiUrl = 'http://127.0.0.1:5000';
const Review = () => {
  const [dogReview, setDogReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState({
    userId: '',
    dogHouseId: '',
    content: '',
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/reviews`); 
        if (!response.ok) {
          throw new Error('Failed to fetch data!');
        }
        const data = await response.json();
        setDogReview(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedReview({
      userId: dogReview.userId,
      dogHouseId: dogReview.dogHouseId,
      content: dogReview.content,
    });
  };

  const handleSaveClick = async () => {
    // Make an API request to update the review with the edited data
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedReview),
      });

      if (!response.ok) {
        throw new Error('Failed to update review!');
      }

      // Fetch the updated review
      const updatedResponse = await fetch('http://127.0.0.1:5000'); //API endpoint
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated data!');
      }

      const updatedData = await updatedResponse.json();
      setDogReview(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {dogReview && (
        <div>
          <h2>Dog Details</h2>
          {isEditing ? (
            <>
              <p>Name: {dogReview.userId}</p>
              <p>Breed: {dogReview.dogHouseId}</p>
              <label>
                Rating:
                <input
                  type="text"
                  name="content"
                  value={editedReview.content}
                  onChange={handleInputChange}
                />
              </label>
            </>
          ) : (
            <>
              <p>Name: {dogReview.userId}</p>
              <p>Breed: {dogReview.dogHouseId}</p>
              <p>Rating: {dogReview.content}</p>
            </>
          )}
          {isEditing ? (
            <button onClick={handleSaveClick}>Save</button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Review;
