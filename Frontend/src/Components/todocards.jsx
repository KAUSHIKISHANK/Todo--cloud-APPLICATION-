import API from "../services/api";
import { useState } from "react";

function TodoCard({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function deleteTodo() {
    try {
      setLoading(true);
      await API.delete(`/todos/${todo._id}`);
      fetchTodos();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateTodo() {
    if (!editTitle.trim()) {
      setStatus("Task title cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      await API.patch(`/todos/${todo._id}`, {
        title: editTitle.trim(),
      });

      setStatus("");
      setIsEditing(false);
      fetchTodos();
    } catch (err) {
      console.log(err);
      setStatus("Unable to update task.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus() {
    try {
      setLoading(true);
      await API.patch(`/todos/${todo._id}`, {
        completed: !todo.completed,
      });

      fetchTodos();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="todo-card">

      <div className="todo-info">

        {isEditing ? (
          <input
            className="todo-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        ) : (
          <h3>{todo.title}</h3>
        )}

        <span className={todo.completed ? "status completed" : "status pending"}>
          {todo.completed ? "Completed ✅" : "Pending ⏳"}
        </span>

        {status ? <p className="todo-inline-status">{status}</p> : null}

      </div>

      <div className="buttons">

        {isEditing ? (
          <>
            <button className="update-btn" onClick={updateTodo} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setIsEditing(false);
                setEditTitle(todo.title);
                setStatus("");
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="update-btn"
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            ✏ Edit
          </button>
        )}

        <button
          className={todo.completed ? "pending-btn" : "complete-btn"}
          onClick={toggleStatus}
          disabled={loading}
        >
          {todo.completed ? "↩ Pending" : "✔ Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={deleteTodo}
          disabled={loading}
        >
          🗑 Delete
        </button>

      </div>

    </div>
  );
}

export default TodoCard;