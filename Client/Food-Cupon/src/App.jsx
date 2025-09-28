import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/signup";
import SignIn from "./Components/Auth/signin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

