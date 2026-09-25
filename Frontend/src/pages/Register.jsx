import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ListTodo } from "lucide-react";
import API from "../services/api";
import "./auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) {
        error = "Full name is required";
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        error = "Email is required";
      } else if (value.includes("@") && value.includes(".")) {
        error = "";
      } else if (value.trim()) {
        error = "Please enter a valid email";
      }
    }

    if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }

    return error;
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  const isFormValid = () => {
    return form.name.trim() &&
           form.email.trim() &&
           form.email.includes("@") &&
           form.email.includes(".") &&
           form.password &&
           form.password.length >= 6;
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.name = validateField("name", form.name);
    newErrors.email = validateField("email", form.email);
    newErrors.password = validateField("password", form.password);
    setErrors(newErrors);
    return isFormValid();
  };

  async function handleRegister(e) {
    e.preventDefault();
    setMessage("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await API.post("/auth/register", form);
      setMessage("Account created successfully. Redirecting to sign in...");
      setMessageType("success");
      setForm({ name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/login", { state: { message: "Account created successfully. Please sign in." } });
      }, 900);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setMessage(errorMsg);
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

          <h1>Build your<br /><span>focused workspace.</span></h1>
          <p>Create an account and keep your everyday tasks in one clean, simple place.</p>

          <div className="auth-points">
            <span><CheckCircle2 size={16} /> One workspace for your tasks</span>
            <span><CheckCircle2 size={16} /> Simple progress tracking</span>
            <span><CheckCircle2 size={16} /> Ready for cloud deployment</span>
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <Link className="auth-back" to="/"><ArrowLeft size={14} /> Back to home</Link>
          <h2>Create account</h2>
          <p className="auth-intro">Set up your TaskFlow account in a few seconds.</p>

          {message && <div className={`auth-message ${messageType}`}>{message}</div>}

          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" name="name" placeholder="Ishank Kumar Kaushik" value={form.name} onChange={handleChange} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" placeholder="Create a password" value={form.password} onChange={handleChange} />
              {errors.password && <span className="field-error">{errors.password}</span>}
              {form.password && !errors.password && (
                <span className="field-hint">✓ Password looks good</span>
              )}
            </div>

            <button className="auth-submit" type="submit" disabled={loading || !isFormValid()}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Register;
