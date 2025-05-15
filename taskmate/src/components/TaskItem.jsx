export default function TaskItem({ task, onDelete }) {
  return (
    <li className="flex justify-between items-center bg-gray-50 border p-4 rounded shadow-sm">
      <span>{task.title}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Hapus
      </button>
    </li>
  );
}
