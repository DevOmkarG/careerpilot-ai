import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          CareerPilot
          <span className="text-blue-400"> AI</span>
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl text-white font-semibold"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </nav>
  );
}