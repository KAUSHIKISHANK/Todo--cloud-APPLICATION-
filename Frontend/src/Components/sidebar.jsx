import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Clock3,
  CheckCircle2,
  Home,
  LogOut,
} from "lucide-react";

export default function Sidebar({ filter, setFilter, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">

      <div>

        <div className="logo">
          <h1>Task<span>Flow</span></h1>
          <p>Manage your daily tasks</p>
        </div>

        <nav className="sidebar-nav">

          <button
            className={location.pathname === "/home" ? "active" : ""}
            onClick={() => navigate("/home")}
          >
            <Home size={20} />
            Home
          </button>

          <button
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            <ListTodo size={20} />
            Tasks
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            <Clock3 size={20} />
            Pending
          </button>

          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            <CheckCircle2 size={20} />
            Done
          </button>

        </nav>

      </div>

      <button className="logout" onClick={onLogout}>
        <LogOut size={20} />
        Sign out
      </button>

    </aside>
  );
}