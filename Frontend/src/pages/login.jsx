import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ListTodo } from "lucide-react";
import API from "../services/api";
import "./auth.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setMessageType("success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please check your details.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-brand">
            <span className="auth-brand-mark"><ListTodo size={20} /></span>
            <span>Task<span style={{color:"#60a5fa"}}>Flow</span></span>
          </div>

          <h1>Welcome back.<br /><span>Let's get things done.</span></h1>
          <p>Sign in to your workspace and pick up right where you left off.</p>

          <div className="auth-points">
            <span><CheckCircle2 size={16} /> Keep your tasks organized</span>
            <span><CheckCircle2 size={16} /> Track pending and completed work</span>
            <span><CheckCircle2 size={16} /> Access your workspace from anywhere</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <Link className="auth-back" to="/"><ArrowLeft size={14} /> Back to home</Link>
          <h2>Sign in</h2>
          <p className="auth-intro">Enter your details to access your TaskFlow workspace.</p>

          {message && <div className={`auth-message ${messageType}`}>{message}</div>}

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
            </div>

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
