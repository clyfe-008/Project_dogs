import React, {useState, useEffect}from 'react';

const Review = () => {
    const [dogReview, setDogReview ]= useState(null)
     const [loading, setLoading] = useState(true)

     useEffect(() =>{
      const FetchReview = async () => {
        try{
          setLoading(true);
         
          const response = await fetch ('')
           if(!response.ok){
            throw new Error('Failed to fetch data!')
        }
        const data = await response.json();
        setDogReview(dogReview);
        }
        catch (error){
          console.error('Error fetching data:', error)
        }
        finally{
          setLoading(false);
        }
       }
       FetchReview();
     },[])
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {dogReview &&(
        <div>
          <h2>Dog Details</h2>
          <p>Name: {dogReview.userId}</p>
          <p>Breed: {dogReview.dogHouseId}</p>
          <p>Rating: {dogReview.content}</p>
        </div>
        )}
    </div>
);
};
export default Review;
