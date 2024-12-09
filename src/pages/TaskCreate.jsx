import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskCreate() {
  const navigate = useNavigate();
  const [task, setTask] = useState({ name: "", description: "" });

  const handleCreateTask = (e) => {
    e.preventDefault();
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const user = database.find((u) => u.email === currentUserEmail);
    if (user) {
      const newTask = {
        id: Date.now().toString(),
        name: task.name,
        description: task.description,
      };
      user.tasks = user.tasks || [];
      user.tasks.push(newTask);
      localStorage.setItem("database", JSON.stringify(database));
      navigate("/tasks");
    }
  };

  return (
    <form onSubmit={handleCreateTask}>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Task Description:</label>
        <input
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          required
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskCreate;
