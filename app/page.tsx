import Link from "next/link";

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative text-zinc-900 flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/home.png')" }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        <br></br><br></br>
        <span className="px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider bg-blue-600 text-white rounded-full shadow-md">
          Student Management System
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 mb-6 drop-shadow-sm">
          Welcome to the Portal
        </h1>

        <p className="text-sm font-medium text-zinc-700 mb-8 drop-shadow-sm">
          Manage courses, students, and system administration seamlessly in one place.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/login" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg transition duration-200 text-center"
          >
            Login
          </Link>

          <Link 
            href="/register" 
            className="px-8 py-3 bg-white hover:bg-zinc-100 text-blue-600 border border-blue-600 font-medium rounded-xl shadow-lg transition duration-200 text-center"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}