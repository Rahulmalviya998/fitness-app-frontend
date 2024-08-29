

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './exercise.css'

const Myexercise = () => {
  const [myExercises, setMyExercises] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchMyExercises = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/exercises/getmyexercises');
  //       setMyExercises(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching my exercises:', error);
  //     }
  //   };

  //   fetchMyExercises();
  // }, []);
  // useEffect(() => {
  //   const fetchMyExercises = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/exercises/getmyexercises');
  //       console.log(response.data);  // Log to inspect the structure
  //       setMyExercises(response.data);
  //     } catch (error) {
  //       console.error('Error fetching my exercises:', error);
  //     }
  //   };

  //   fetchMyExercises();
  // }, []);

  useEffect(() => {
    const fetchMyExercises = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token
        console.log(token)
        const response = await axios.get('http://localhost:5000/exercises/getmyexercises', {
          headers: {
            'Content-Type': 'application/json',
            'tokenInput': token // Pass the token in the header
          },

        });
        console.log(response.data)
        setMyExercises(response.data);
      } catch (error) {
        console.error('Error fetching my exercises:', error);
      }
    };

    fetchMyExercises();
  }, []);


  const handleExerciseClick = (exerciseId) => {
    navigate(`/instruction/${{ exerciseId }}`);
  };

  return (
    <div className="my-exercise-container">
      <h2>My Exercises</h2>
      <div className="exercise-grid">
        {/* {myExercises.map(exercise => (
          
          <div key={exercise.id} className="exercise-card" onClick={() => handleExerciseClick(exercise.id)}>
            <img src={exercise.imageUrl} alt={exercise.title} />
            <h3>{exercise.title}</h3>
          
          </div>
         
        ))} */}
        {myExercises.map(myExercise => (
          <div key={myExercise.id} className="exercise-card" onClick={() => handleExerciseClick(myExercise.exerciseId)}>
            <img
              src={myExercise.Exercise.imageUrl || 'default-image-url.jpg'} // Accessing the nested Exercise imageUrl
              alt={myExercise.Exercise.title}
              onError={(e) => { e.target.src = 'default-image-url.jpg'; }} // Fallback if the image fails to load
            />
            <h3>{myExercise.Exercise.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myexercise;
