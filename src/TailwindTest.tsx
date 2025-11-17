export default function TailwindTest() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Tailwind CSS Works! ✅
        </h1>
        <p className="text-red-600 mb-6">
          If you can see this styled box with a blue-purple gradient background,
          Tailwind utilities are working correctly.
        </p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
          Test Button
        </button>
      </div>
    </div>
  );
}
