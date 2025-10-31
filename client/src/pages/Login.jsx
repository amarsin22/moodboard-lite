import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token, res.data.user);
      nav("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">   {/* ✅ centers the page */}
      <form className="auth-page" onSubmit={submit}>
        <h2>Login</h2>

        <input 
          type="email"
          placeholder="Email"
          onChange={(e)=>setForm({...form, email:e.target.value})}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setForm({...form, password:e.target.value})}
          required
        />

        <button type="submit">Login</button>

        <p style={{textAlign: "center", marginTop: "8px"}}>
          New user? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
