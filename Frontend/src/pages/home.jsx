import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Clock3, ListTodo, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Sidebar from "../Components/sidebar";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 21) return "Good evening";
    return "Good night";
  }

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
  const recentTodos = [...todos].slice(-4).reverse();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="home-layout">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        onLogout={handleLogout}
        isDashboard={false}
      />

      <main className="home-content">
        <div className="home-topbar">
          <div>
            <p className="home-date">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <h1>{getGreeting()}, {user?.name?.split(" ")[0] || "there"} <span>👋</span></h1>
            <p>Here’s a quick overview of your workspace.</p>
          </div>

          <button className="home-add-btn" onClick={() => navigate("/dashboard")}>
            <Plus size={17} /> Manage tasks
          </button>
        </div>

        <section className="home-stats">
          <article>
            <div className="home-stat-icon blue"><ListTodo size={19} /></div>
            <span>Total tasks</span>
            <strong>{todos.length}</strong>
          </article>
          <article>
            <div className="home-stat-icon amber"><Clock3 size={19} /></div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </article>
          <article>
            <div className="home-stat-icon green"><CheckCircle2 size={19} /></div>
            <span>Completed</span>
            <strong>{completed}</strong>
          </article>
        </section>

        <section className="home-section">
          <div className="home-section-heading">
            <div>
              <p>Workspace</p>
              <h2>Recent tasks</h2>
            </div>
            <button onClick={() => navigate("/dashboard")}>
              View all <ArrowRight size={16} />
            </button>
          </div>

          {recentTodos.length === 0 ? (
            <div className="home-empty">
              <div className="home-empty-icon"><ListTodo size={23} /></div>
              <h3>Your workspace is ready.</h3>
              <p>Create your first task and start building momentum.</p>
              <button onClick={() => navigate("/dashboard")}>Create your first task <ArrowRight size={16} /></button>
            </div>
          ) : (
            <div className="recent-list">
              {recentTodos.map((todo) => (
                <div className="recent-task" key={todo._id}>
                  <div className={`recent-check ${todo.completed ? "is-done" : ""}`}>
                    {todo.completed ? "✓" : ""}
                  </div>
                  <span className={todo.completed ? "recent-title done" : "recent-title"}>{todo.title}</span>
                  <span className={todo.completed ? "recent-status done" : "recent-status"}>
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="home-tip">
          <div>
            <span>Stay focused</span>
            <h2>One task at a time.</h2>
            <p>Use the task workspace to add, search, update and complete your work.</p>
          </div>
          <button onClick={() => navigate("/dashboard")}>Open task workspace <ArrowRight size={17} /></button>
        </section>
      </main>
    </div>
  );
}

export default Home;
