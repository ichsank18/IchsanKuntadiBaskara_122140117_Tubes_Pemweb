import { useEffect, useState } from "react"; // Hapus useCallback jika tidak dipakai di sini
import axios from "axios";
import TaskCard from "../components/TaskCard";
import useTasks from "../hooks/useTasks";
import { useNavigate } from "react-router-dom"; // Pastikan ini ada

export default function Dashboard() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // useNavigate sudah diimpor

  // Ambil setTasks jika memang akan digunakan untuk update lokal di handleEditTask
  // Jika semua update via fetchTasks, setTasks mungkin tidak perlu di-destructure di sini.
  const { tasks, setTasks, addTask: addTaskFromHook, deleteTask: deleteTaskFromHook, fetchTasks } = useTasks(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      if (fetchTasks) { // Pastikan fetchTasks ada sebelum dipanggil
        fetchTasks();
      }
    } else {
      navigate("/");
    }
  }, [token, navigate, fetchTasks]); // fetchTasks dari useTasks adalah dependensi

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      alert("Judul task tidak boleh kosong.");
      return;
    }
    try {
      await addTaskFromHook({ title: newTaskTitle });
      setNewTaskTitle("");
    } catch (error) {
      console.error("Gagal menambah task:", error);
      alert("Gagal menambahkan task: " + (error.response?.data?.message || error.message));
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTaskFromHook(id);
    } catch (error) {
      console.error("Gagal menghapus task:", error);
      alert("Gagal menghapus task: " + (error.response?.data?.message || error.message));
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  const handleEditTask = async (id, newTitle, newDescription, newStatus) => {
    try {
      const response = await axios.put( // 'response' digunakan di sini
        `http://localhost:6543/api/tasks/${id}`,
        { title: newTitle, description: newDescription, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Untuk menghilangkan warning 'setTasks' is assigned a value but never used,
      // Anda bisa selalu memanggil fetchTasks atau menggunakan setTasks:
      // Opsi 1: Selalu fetch ulang (konsisten tapi lebih banyak request)
      // fetchTasks(); 
      // Opsi 2: Update state lokal (lebih cepat, menghilangkan warning setTasks)
      const updatedTasks = tasks.map((task) =>
        task.id === id ? response.data : task // Gunakan response.data dari hasil PUT
      );
      setTasks(updatedTasks); // Warning setTasks hilang jika ini digunakan

    } catch (error) {
      console.error("Gagal mengedit task:", error);
      alert("Gagal mengedit task: " + (error.response?.data?.message || error.message));
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };
  
  // ... (JSX return tetap sama) ...
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex justify-between items-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">📋 Dashboard Tugas</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition"
        >
          Logout
        </button>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mb-8">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Judul tugas baru..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow transition mt-2"
          >
            Tambah
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
}