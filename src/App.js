import React, { useState, useEffect } from "react";

const FILTERS = {
  ALL: "all",
  COMPLETED: "completed",
  PENDING: "pending",
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === FILTERS.COMPLETED) return task.completed;
    if (filter === FILTERS.PENDING) return !task.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">To-Do List</h1>
      <AddTodo onAdd={addTask} />
      <FilterDropdown filter={filter} setFilter={setFilter} />
      <TodoTable tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

const AddTodo = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit" className="btn btn-primary">Add</button>
    </form>
  );
};

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <div className="mb-3">
      <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value={FILTERS.ALL}>All</option>
        <option value={FILTERS.COMPLETED}>Completed</option>
        <option value={FILTERS.PENDING}>Pending</option>
      </select>
    </div>
  );
};

const TodoTable = ({ tasks, onToggle, onDelete }) => {
  return (
    <table className="table table-bordered text-center">
      <thead className="table-dark">
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TodoRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

const TodoRow = ({ task, onToggle, onDelete }) => {
  return (
    <tr>
      <td>{task.text}</td>
      <td>
        <span className={`badge ${task.completed ? "bg-success" : "bg-warning"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </td>
      <td>
        <button className="btn btn-success btn-sm me-2" onClick={() => onToggle(task.id)} disabled={task.completed}>
          Complete
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default App;
