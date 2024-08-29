// import logo from './logo.svg';
import './App.css';
import Regispage from './component/regispage';
// import Frontpg from './component/frontpg';




// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}

//     <Regispage/> 
//   {/* <Frontpg></Frontpg> */}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import About from "./component/About";
import Exercise from "./component/Exercise";
import Myexercise from "./component/Myexerciese";
import Store from "./component/Store";
import { UserProvider } from './component/Userprovider';
import ExerciseInstructions from './component/ExerciseInstruction';

// function App() {
//   return <>
//     <Header />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       <Route path="/exercise" element={<Exercise />} />
//       <Route path="/myexercise" element={<Myexercise />} />
//       <Route path="/store" element={<Store />} />
//     </Routes>
//   </>
// }

// export default App;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <UserProvider>
      <div className="App">
        {!isLoggedIn ? (
          <Regispage  onLogin={handleLogin} />
        ) : (
          <>
            <Header onLogout={handleLogout} />

            <Routes>
              {/* <Route path="/" element={<Regispage />} /> */}
              <Route path="/home" element={<Home/>} />
              <Route path="/about" element={<About />} />
              <Route path="/exercise" element={<Exercise />} />
              <Route path="/myexercise" element={<Myexercise />} />
              <Route path="/store" element={<Store />} />
              <Route path='/logout' element={<Regispage onLogin={handleLogin} />} />
              <Route path="/instruction/:id" element={<ExerciseInstructions />} />
            </Routes>

          </>
        )}
      </div>
    </UserProvider>
  );
}

export default App;
