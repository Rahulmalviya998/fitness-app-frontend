// import React, { useState } from "react";
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import './Dashboard.css';

// const Dashboard = ({ onClose }) => {
//   const [age, setAge] = useState("");
//   const [height, setHeight] = useState("");
//   const [weight, setWeight] = useState("");
//   const [bmi, setBMI] = useState(null);

//   const calculateBMI = () => {
//     const heightInMeters = height / 100;
//     const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//     setBMI(calculatedBMI);
//   };

//   const getBMIColor = () => {
//     if (bmi < 18.5) return "#f4d03f"; //yellow colour  underweight
//     if (bmi >= 18.5 && bmi <= 24.9) return "#58d68d"; // normal ke liye green
//     return "#e74c3c"; // Red  overweight ke liye 
//   };

//   return (
//     <div className="dashboard-container">
//       <button className="close-button" onClick={onClose}>×</button>
//       <h2>BMI Dashboard</h2>
//       <div className="input-group">
//         <label>Age:</label>
//         <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
//       </div>
//       <div className="input-group">
//         <label>Height (cm):</label>
//         <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
//       </div>
//       <div className="input-group">
//         <label>Weight (kg):</label>
//         <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
//       </div>
//       <button className="calculate-button" onClick={calculateBMI}>Calculate BMI</button>
//       {bmi && (
//         <div className="bmi-result">
//           <p>Your BMI is: {bmi}</p>
//           <div className="bmi-chart-container">
//             <CircularProgressbar 
//               value={bmi} 
//               maxValue={40}
//               text={`${bmi}`}
//               styles={buildStyles({
//                 pathColor: getBMIColor(),
//                 textColor: getBMIColor(),
//                 trailColor: '#d6d6d6',
//                 backgroundColor: '#f5f5f5',
//               })}
//             />
//           </div>
//           <div className="bmi-chart">
//             <div className="bmi-category underweight">Underweight</div>
//             <div className="bmi-category normal">Normal</div>
//             <div className="bmi-category overweight">Overweight</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = ({ onClose }) => {
  const ageRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const [bmi, setBMI] = useState(null);

  const calculateBMI = async () => {
    const age = ageRef.current.value;
    const height = heightRef.current.value;
    const weight = weightRef.current.value;

    try {
      const response = await axios.post('http://localhost:5000/user/track', {
        age,
        height,
        weight
      });
      setBMI(response.data.bmi);
    } catch (error) {
      console.error("Error calculating BMI:", error);
    }
  };

  const getBMIColor = () => {
    if (bmi < 18.5) return "#f4d03f"; // Yellow for underweight
    if (bmi >= 18.5 && bmi <= 24.9) return "#58d68d"; // Green for normal
    return "#e74c3c"; // Red for overweight
  };

  return (
    <div className="dashboard-container">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label>Age:</label>
        <input type="number" ref={ageRef} />
      </div>
      <div className="input-group">
        <label>Height (ft):</label>
        <input type="number" ref={heightRef} />
      </div>
      <div className="input-group">
        <label>Weight (kg):</label>
        <input type="number" ref={weightRef} />
      </div>
      <button className="calculate-button" onClick={calculateBMI}>Calculate BMI</button>
      {bmi !== null && (
        <div className="bmi-result">
          <p>Your BMI is: {bmi}</p>
          <div className="bmi-chart-container">
            <CircularProgressbar 
              value={bmi} 
              maxValue={40}
              text={`${bmi}`}
              styles={buildStyles({
                pathColor: getBMIColor(),
                textColor: getBMIColor(),
                trailColor: '#d6d6d6',
                backgroundColor: '#f5f5f5',
              })}
            />
          </div>
          <div className="bmi-chart">
            <div className="bmi-category underweight">Underweight</div>
            <div className="bmi-category normal">Normal</div>
            <div className="bmi-category overweight">Overweight</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
