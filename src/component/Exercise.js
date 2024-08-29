import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./exercise.css"

const Exercise = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/exercises/');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  const handleBuyClick = async (exercise) => {
    try {

      const { data: { order } } = await axios.post('http://localhost:5000/exercises/book', { amount: exercise.price * 100 });
      openRazorpay(order, exercise);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
    }
  };

  const openRazorpay = (order, exercise,) => {
    const options = {
      key: 'rzp_test_fKPxDf7NyeIHBX', // Replace with your Razorpay key
      amount: order.amount,
      currency: 'INR',
      name: 'Fitness App',
      description: `Payment for ${exercise.title}`,
      order_id: order.id,
      handler: async (response) => {
        try {
          const token = localStorage.getItem('token'); // Retrieve the token
          console.log(token)
          // await axios.post('http://localhost:5000/exercises/addmyexercises', {
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'tokenInput': token // Pass the token in the header
          //   },

          //   exerciseId: exercise.id,
          //   razorpayPaymentId: response.razorpay_payment_id,
          // });
          await axios.post('http://localhost:5000/exercises/addmyexercises',
            {
              exerciseId: exercise.id,
              razorpayPaymentId: response.razorpay_payment_id,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'tokenInput': token// Pass the token in the header
              }
            });
          alert('Exercise added to My Exercises!');
        } catch (error) {
          console.error('Error adding exercise to My Exercises:', error);
        }
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9165920512',
      },
      notes: {
        address: 'User Address',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="exercise-container">
      <h2>Available Exercises</h2>
      <div className="exercise-grid">
        {exercises.map(exercise => (
          <div key={exercise.id} className="exercise-card">
            <img src={exercise.imageUrl} alt={exercise.title} />
            <h3>{exercise.title}</h3>
            <p>Body Parts: {exercise.bodyParts}</p>
            <p>{exercise.description}</p>
            <p>Price: ₹{exercise.price}</p>
            <button onClick={() => handleBuyClick(exercise)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercise;
