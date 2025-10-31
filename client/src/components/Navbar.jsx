import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = dark ? "light" : "dark";
    setDark(!dark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme === "dark" ? "dark" : "";
  };

  return (
    <nav style={{ display: "flex", gap:"12px", padding:"12px 16px" }}>
      <Link to="/">Today</Link>
      <Link to="/create">Create Mood</Link>
      <Link to="/timeline">Timeline</Link>

      {/* theme toggle */}
      <button 
        onClick={toggleTheme} 
        style={{ width:"auto", padding:"6px 10px", marginLeft:"auto" }}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {user ? (
        <button 
          onClick={logout} 
          style={{ width:"auto", padding:"6px 10px" }}
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button style={{ width:"auto", padding:"6px 10px" }}>Login</button>
        </Link>
      )}
    </nav>
  );
}
