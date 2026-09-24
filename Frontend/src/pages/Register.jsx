import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }

  async function handleRegister(e) {

    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      await API.post("/auth/register", form);

      setMessage("Account created. Redirecting to login...");
      setMessageType("success");

      setForm({ name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/", { state: { message: "Account created successfully. Please log in." } });
      }, 900);

    } catch (err) {

      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
      setMessageType("error");

    } finally {
      setLoading(false);
    }

  }

  return (

    <div className="auth-container">

      <form className="auth-card" onSubmit={handleRegister}>

        <h1>Create Account</h1>

        {message ? (
          <div className={`auth-message ${messageType}`}>
            {message}
          </div>
        ) : null}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">

          {loading ? "Creating..." : "Register"}

        </button>

        <p>

          Already have an account?

          <Link to="/">

            Login

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;