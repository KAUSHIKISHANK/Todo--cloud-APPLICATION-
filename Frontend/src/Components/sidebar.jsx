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

export default function Sidebar({ filter, setFilter, onLogout, isDashboard = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div>
        <button className="logo-button" onClick={() => navigate("/home")}>
          <div className="logo">
            <h1>Task<span>Flow</span></h1>
            <p>Simple. Focused. Productive.</p>
          </div>
        </button>

        <nav className="sidebar-nav">
          <button
            className={location.pathname === "/home" ? "active" : ""}
            onClick={() => navigate("/home")}
          >
            <Home size={19} />
            Overview
          </button>

          <button
            className={location.pathname === "/dashboard" && filter === "all" ? "active" : ""}
            onClick={() => {
              navigate("/dashboard");
              setFilter("all");
            }}
          >
            <LayoutDashboard size={19} />
            All tasks
          </button>

          {isDashboard && (
            <>
              <button
                className={filter === "pending" ? "active" : ""}
                onClick={() => setFilter("pending")}
              >
                <Clock3 size={19} />
                Pending
              </button>

              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                <CheckCircle2 size={19} />
                Completed
              </button>
            </>
          )}

          {!isDashboard && (
            <button onClick={() => navigate("/dashboard")}>
              <ListTodo size={19} />
              Task workspace
            </button>
          )}
        </nav>
      </div>

      <button className="logout" onClick={onLogout}>
        <LogOut size={18} />
        Sign out
      </button>
    </aside>
  );
}
