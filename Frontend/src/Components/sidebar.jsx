import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Clock3,
  CheckCircle2,
  Home,
  LogOut,
} from "lucide-react";

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div>
        <button className="logo-button" onClick={() => navigate("/home")}>
          <div className="logo">
            <h1>
              Task<span>Flow</span>
            </h1>
            <p>Simple. Focused. Productive.</p>
          </div>
        </button>

        <nav className="sidebar-nav">

          {/* Overview */}
          <button
            className={location.pathname === "/home" ? "active" : ""}
            onClick={() => navigate("/home")}
          >
            <Home size={19} />
            Overview
          </button>

          {/* All Tasks */}
          <button
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={19} />
            All tasks
          </button>

          {/* Pending */}
          <button
            className={location.pathname === "/pending" ? "active" : ""}
            onClick={() => navigate("/pending")}
          >
            <Clock3 size={19} />
            Pending
          </button>

          {/* Completed */}
          <button
            className={location.pathname === "/completed" ? "active" : ""}
            onClick={() => navigate("/completed")}
          >
            <CheckCircle2 size={19} />
            Completed
          </button>

        </nav>
      </div>

      {/* Logout */}
      <button className="logout" onClick={onLogout}>
        <LogOut size={18} />
        Sign out
      </button>
    </aside>
  );
}