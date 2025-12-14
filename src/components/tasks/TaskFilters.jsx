export default function TaskFilters({ search, setSearch }) {
  return (
    <div className="mb-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
