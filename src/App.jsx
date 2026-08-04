import { Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;