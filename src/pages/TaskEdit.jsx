import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ name: "", description: "" });

  useEffect(() => {
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const user = database.find((u) => u.email === currentUserEmail);
    if (user) {
      const taskToEdit = user.tasks.find((task) => task.id === id);
      if (taskToEdit) setTask(taskToEdit);
    }
  }, [id]);

  const handleEditTask = (e) => {
    e.preventDefault();
    const currentUserEmail = localStorage.getItem("current_user_email");
    const database = JSON.parse(localStorage.getItem("database")) || [];
    const user = database.find((u) => u.email === currentUserEmail);
    if (user) {
      user.tasks = user.tasks.map((t) =>
        t.id === id ? { ...t, ...task } : t
      );
      localStorage.setItem("database", JSON.stringify(database));
      navigate("/tasks");
    }
  };

  return (
    <form onSubmit={handleEditTask}>
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
      <button type="submit">Update Task</button>
    </form>
  );
}

export default TaskEdit;
