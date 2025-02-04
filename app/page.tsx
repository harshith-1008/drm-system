export default function AuthLanding() {
  return (
    <div className="min-h-screen bg-[#020817] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        <span className="text-white">Welcome To</span>{" "}
        <span className="bg-gradient-to-r from-violet-500 to-violet-400 bg-clip-text text-transparent block md:inline">
          Auth Demo
        </span>
      </h1>

      <p className="text-gray-400 text-center mb-8 max-w-lg">
        A modern authentication example with a beautiful dark theme interface
      </p>

      <div className="flex gap-4">
        <button className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors">Login</button>
        <button className="px-6 py-2 border border-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors">
          Sign up
        </button>
      </div>
    </div>
  )
}