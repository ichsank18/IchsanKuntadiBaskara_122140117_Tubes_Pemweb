import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  

  useEffect(() => {
    // Dummy data tugas
    const dummyTasks = [
      { id: 1, title: "Belajar React" },
      { id: 2, title: "Mengerjakan tugas Pyramid" },
      { id: 3, title: "Buat dokumentasi API" },
      { id: 4, title: "Refactor halaman Dashboard" },
    ];
    setTasks(dummyTasks);
  }, []);
  

  const addTask = () => {
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const task = { id: newId, title: newTask };
    setTasks([...tasks, task]);
    setNewTask("");
  };
  

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">📋 Dashboard Tugas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition"
        >
          Logout
        </button>
      </div>
  
      {/* Input Tugas */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Tugas baru..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition"
          >
            Tambah
          </button>
        </div>
      </div>
  
      {/* Daftar Tugas */}
      <div className="max-w-4xl mx-auto space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
  
  
}
