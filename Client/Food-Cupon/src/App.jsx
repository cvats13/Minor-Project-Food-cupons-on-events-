import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/signup";
import SignIn from "./Components/Auth/signin";
import Home from "./Components/home/Home";
import Setting from "./Components/Settings/SettingPage";
import ImportPage from "./Components/Import/Import_Page";
import LogsPage from "./Components/Logs_Page/logs_page";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />


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

        <Route
          path="/import"
          element={
            <ProtectedRoute>
              <ImportPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <LogsPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
