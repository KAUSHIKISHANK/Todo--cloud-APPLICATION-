import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";

import ProtectedRoute from "./Components/protectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Overview */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* All Tasks */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Pending Tasks */}
        <Route
          path="/pending"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Completed Tasks */}
        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;