export default function TaskItem({ task }) {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
    </div>
  );
}