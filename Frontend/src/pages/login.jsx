import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

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

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

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

      setMessage(err.response?.data?.message || "Login failed. Please try again.");
      setMessageType("error");

    } finally {
      setLoading(false);
    }

  }

  return (

    <div className="auth-container">

      <form className="auth-card" onSubmit={handleLogin}>

        <h1>📝 TaskFlow</h1>

        <p>Welcome Back</p>

        {message ? (
          <div className={`auth-message ${messageType}`}>
            {message}
          </div>
        ) : null}

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

          {loading ? "Logging..." : "Login"}

        </button>

        <p>

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>

  );

}

export default Login;