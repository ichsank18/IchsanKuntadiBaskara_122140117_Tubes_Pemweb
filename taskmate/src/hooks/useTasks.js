import { useEffect, useState } from "react";
import axios from "axios";

export default function useTasks(token) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const addTask = async (title) => {
    const res = await axios.post(
      "http://localhost:8000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks((prev) => [...prev, res.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, deleteTask };
}
