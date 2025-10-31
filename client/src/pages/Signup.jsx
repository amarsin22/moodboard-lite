import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      login(res.data.token, res.data.user);
      nav("/");
    } catch (err) {
      alert("Signup failed, try again");
    }
  };

  return (
    <div className="auth-wrapper">    {/* ✅ center the form */}
      <form className="auth-page" onSubmit={submit}>
        <h2>Signup</h2>

        <input 
          placeholder="Name"
          onChange={(e)=>setForm({...form, name:e.target.value})}
          required
        />

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

        <button type="submit">Signup</button>

        <p style={{textAlign: "center", marginTop: "8px"}}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
