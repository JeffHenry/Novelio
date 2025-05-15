import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // or use any icon library

export default function TopNav() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAddBook = () => {
    navigate("/books/add");
  };

  return (
    <nav className="bg-gray-100 shadow px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Novelio
          </Link>

          {user && isAdmin && (
            <>
              <span className="text-sm font-semibold text-red-600 border border-red-600 rounded px-2 py-1">
                Admin
              </span>
              <button
                onClick={handleAddBook}
                className="text-sm bg-green-600 text-white rounded px-2 py-1"
              >
                Add Book
              </button>
            </>
          )}
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Right section (desktop only) */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-gray-700">Hello, {user.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mt-4 space-y-2 md:hidden">
          {user ? (
            <>
              <div className="text-gray-700">Hello, {user.email}</div>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
