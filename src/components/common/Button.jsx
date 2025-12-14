export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      {children}
    </button>
  );
}
