import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/signup";
import SignIn from "./Components/Auth/signin";
import Home from "./Components/home/Home";
import ProtectedRoute from "./Components/ProtectedRoute"; // ✅ new import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Home" element={<Home />} />


        ✅ Protected Home Route
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
