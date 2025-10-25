import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/signup";
import SignIn from "./Components/Auth/signin";
import Home from "./Components/home/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home/>} />
         
      </Routes>
    </Router>
  );
}

export default App;

