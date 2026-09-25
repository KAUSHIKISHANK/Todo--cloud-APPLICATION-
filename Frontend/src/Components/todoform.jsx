import { useState } from "react";
import API from "../services/api";

function TodoForm({ fetchTodos }) {

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  async function submit(e) {

    e.preventDefault();

    if (!title.trim()) {
      setStatus({ type: "error", message: "Please enter a task." });
      return;
    }

    try {

      await API.post("/todos", {
        title,
      });

      setTitle("");
      setStatus({ type: "success", message: "Task added successfully." });

      fetchTodos();

    } catch (err) {

      console.log(err);
      setStatus({ type: "error", message: "Unable to add task. Please try again." });

    }

  }

  return (

    <form className="todo-form" onSubmit={submit}>

      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">

        Add Task

      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`}>
          {status.message}
        </p>
      ) : null}

    </form>

  );

}

export default TodoForm;