import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import Sidebar from "../Components/sidebar";
import Navbar from "../Components/navbar";
import TodoForm from "../Components/todoform";
import TodoCard from "../Components/todocards";
import EmptyState from "../Components/emptystate";

import "../Components/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [user] = useState(() => JSON.parse(localStorage.getItem("user")));

  async function fetchTodos() {
    try {
      const res = await API.get("/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const noMatchingTodos = todos.length > 0 && filteredTodos.length === 0;

  return (
    <div className="dashboard">
      <Sidebar filter={filter} setFilter={setFilter} onLogout={handleLogout} />

      <main className="dashboard-content">
        <Navbar user={user} search={search} setSearch={setSearch} />

       
        <div className="stats">
          <div className="stat-box">
            <h2>{todos.length}</h2>
            <p>Total Tasks</p>
          </div>

          <div className="stat-box">
            <h2>{pending}</h2>
            <p>Pending</p>
          </div>

          <div className="stat-box">
            <h2>{completed}</h2>
            <p>Completed</p>
          </div>
        </div>

        
        <TodoForm fetchTodos={fetchTodos} />

       
        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            noMatchingTodos ? (
              <div className="empty">
                <h2>🔎</h2>
                <h3>No matching tasks</h3>
                <p>
                  Clear the search box or switch back to all tasks.
                </p>
                <button
                  className="show-btn"
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}
                >
                  Clear search
                </button>
              </div>
            ) : (
              <EmptyState />
            )
          ) : (
            filteredTodos.map((todo) => (
              <TodoCard
                key={todo._id}
                todo={todo}
                fetchTodos={fetchTodos}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard; 

