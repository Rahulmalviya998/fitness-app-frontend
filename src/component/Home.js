// function Home() {
//   return <>
//     <h3 className="mt-2">home render</h3>
//   </>
// }

// export default Home;
import React, { useState } from "react";
import Dashboard from "./Dashboard";

import './Home.css';

const Home = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleBMIClick = () => {
    setShowDashboard(true);
  }
  const handleCloseDashboard = () => {
    setShowDashboard(false);
  };
  return (

    <div className="home-container">

      {!showDashboard ? (
        <div className="center-content">
          <div className="welcome-container">
            <h1>Welcome to Our Fitness App</h1>
            <p className="tagline">Your journey to a healthier life starts here!</p>
            <button className="bmi-button" onClick={handleBMIClick}>BMI Calculator</button>
          </div>
        </div>
      ) : (
        <Dashboard onClose={handleCloseDashboard} />
      )}
    </div>

  );
}

export default Home;
