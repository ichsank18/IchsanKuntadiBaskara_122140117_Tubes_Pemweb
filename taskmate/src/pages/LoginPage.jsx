import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => { // Ubah menjadi async
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6543/api/login", {
        email,
        password,
      });
      // Backend akan mengembalikan token jika berhasil
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token); //
        // Anda mungkin juga ingin menyimpan info pengguna lain jika ada dari respons backend
        // if (response.data.name) {
        //   localStorage.setItem("userName", response.data.name);
        // }
        navigate("/dashboard"); //
      } else {
        // Ini mungkin tidak akan terjadi jika backend selalu mengirim token atau error
        alert("Login gagal: Token tidak diterima dari server.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(`Login gagal: ${err.response.data.message}`);
      } else if (err.response && err.response.status === 401) { // Unauthorized
        alert("Login gagal: Email atau password salah.");
      } else {
        alert("Login gagal! Terjadi kesalahan pada server atau jaringan.");
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Login ke TaskMate
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 underline"
          >
            Daftar di sini
          </button>
        </p>
      </form>
    </div>
  );
}