export default function TaskInput({ newTask, setNewTask, onAdd }) {
    return (
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Tugas baru..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tambah
        </button>
      </div>
    );
  }
  