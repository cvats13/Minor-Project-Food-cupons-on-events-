import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/signup";
import SignIn from "./Components/Auth/signin";
import Home from "./Components/home/Home";
import Setting from "./Components/Settings/SettingPage";
import ProtectedRoute from "./Components/ProtectedRoute";

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
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Setting/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
