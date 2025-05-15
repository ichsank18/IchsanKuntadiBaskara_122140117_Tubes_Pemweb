import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 italic">Belum ada tugas ditambahkan.</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
}
