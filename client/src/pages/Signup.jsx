import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/signup", form);
    login(res.data.token, res.data.user);
    nav("/");
  };

  return (
      <form className="auth-page" onSubmit={submit}>
      <h2>Signup</h2>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Signup</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
  );
}
