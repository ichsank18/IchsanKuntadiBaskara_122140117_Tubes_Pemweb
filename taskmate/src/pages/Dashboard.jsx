import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTask = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/tasks",
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setNewTask("");
    } catch (err) {
      alert("Gagal menambah tugas.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      alert("Gagal menghapus tugas.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Dashboard Tugas</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tugas baru"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border w-full"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4">
          Tambah
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between border-b py-2">
            <span>{task.title}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}