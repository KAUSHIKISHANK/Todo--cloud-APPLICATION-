import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="home-page">
      <div className="home-shell">
        <header className="home-header">
          <div>
            <p className="home-kicker">Signed in as</p>
            <h1>{user?.name || "User"}</h1>
            <p className="home-subtitle">Choose a section to continue.</p>
          </div>

          <div className="home-actions">
            <button className="home-secondary-btn" onClick={handleLogout}>
              Sign out
            </button>
            <button className="home-primary-btn" onClick={() => navigate("/dashboard")}>
              Open Dashboard
            </button>
          </div>
        </header>

        <section className="home-grid">
          <article className="home-card">
            <span>Total Tasks</span>
            <strong>{todos.length}</strong>
          </article>

          <article className="home-card">
            <span>Pending</span>
            <strong>{pending}</strong>
          </article>

          <article className="home-card">
            <span>Completed</span>
            <strong>{completed}</strong>
          </article>
        </section>

        <section className="home-panel">
          <h2>Workspace overview</h2>
          <p>
            This is the landing page after login. Use <strong>Open Dashboard</strong> to manage tasks.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Home;