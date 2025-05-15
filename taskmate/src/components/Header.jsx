export default function Header({ title, onLogout }) {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    );
  }
  