import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const user = database.find((u) => u.email === currentUserEmail);
    if (user) {
      setTasks(user.tasks || []);
    }
  }, []);

  const handleDeleteTask = (id) => {
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const user = database.find((u) => u.email === currentUserEmail);
    if (user) {
      user.tasks = user.tasks.filter((task) => task.id !== id);
      localStorage.setItem("database", JSON.stringify(database));
      setTasks(user.tasks);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
      <Link to="/tasks/create">Create New Task</Link>
    </div>
  );
}

export default TaskList;
