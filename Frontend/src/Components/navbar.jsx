import "./navbar.css";
import { Search } from "lucide-react";

function Navbar({ user, search, setSearch }) {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <p className="today">{today}</p>
        <h2>Overview</h2>
      </div>

      <div className="navbar-right">
        <div className="search-wrap">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

    </nav>
  );
}

export default Navbar;