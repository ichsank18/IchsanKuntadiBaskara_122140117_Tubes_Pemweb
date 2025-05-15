import { useState } from "react";

export default function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition hover:shadow-lg">
      {isEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="flex-1 p-2 mr-2 border rounded text-gray-800"
        />
      ) : (
        <span className="flex-1 text-gray-800">{task.title}</span>
      )}

      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition text-sm"
          >
            Simpan
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-400 text-white px-4 py-1 rounded hover:bg-blue-500 transition text-sm"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-400 text-white px-4 py-1 rounded hover:bg-red-500 transition text-sm"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
