import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useTasks(token) {
  const [tasks, setTasks] = useState([]);

  // Definisikan fetchTasks menggunakan useCallback agar referensinya stabil
  // dan bisa digunakan sebagai dependency di useEffect dengan aman.
  const fetchTasks = useCallback(async () => {
    if (!token) {
      setTasks([]); // Kosongkan tasks jika tidak ada token
      return;
    }
    try {
      const res = await axios.get("http://localhost:8000/api/tasks", { //
        headers: { Authorization: `Bearer ${token}` }, //
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Gagal mengambil tasks:", err);
      setTasks([]);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        // Navigasi sebaiknya ditangani oleh komponen yang menggunakan hook
        // atau dengan cara lain yang tidak mengikat hook ini ke window.location
      }
    }
  }, [token]); // 'token' adalah satu-satunya dependensi eksternal untuk fetchTasks

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Sekarang fetchTasks adalah dependensi yang stabil

  const addTask = async (taskData) => {
    try {
      // 'res' dari await axios.post tidak secara eksplisit digunakan setelahnya
      // jadi kita bisa menghapus assignment jika tidak ada logika lain yang membutuhkannya.
      // Jika Anda ingin mengembalikan data task yang baru, Anda bisa:
      const response = await axios.post( //
        "http://localhost:8000/api/tasks", //
        taskData,
        { headers: { Authorization: `Bearer ${token}` } } //
      );
      fetchTasks(); // Panggil fetchTasks untuk memperbarui daftar
      return response.data; // Mengembalikan data task yang baru dibuat
    } catch (error) {
      console.error("Gagal menambah task:", error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Panggil fetchTasks untuk memperbarui daftar
    } catch (error) {
      console.error("Gagal menghapus task:", error);
      throw error;
    }
  };

  return { tasks, setTasks, addTask, deleteTask, fetchTasks };
}