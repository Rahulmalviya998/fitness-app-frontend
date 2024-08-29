import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Exercise from "./Exercise";
import Myexercise from "./Myexerciese";
import Store from "./Store";
function Frontpg (req, res ){
    return<>
    <Header/>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/exercise" element={<Exercise/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/myexercise" element={<Myexercise/>}/>
    </Routes>
  </>
}
export default Frontpg;
