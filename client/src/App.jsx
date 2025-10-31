import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Today from "./pages/Today";
import CreateMood from "./pages/CreateMood";
import Timeline from "./pages/Timeline";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={
            <ProtectedRoute><Today /></ProtectedRoute>
          }/>

          <Route path="/create" element={
            <ProtectedRoute><CreateMood /></ProtectedRoute>
          }/>

          <Route path="/timeline" element={
            <ProtectedRoute><Timeline /></ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
