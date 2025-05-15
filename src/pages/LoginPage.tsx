import { useState } from "react";
import { useAuthHandlers } from "../hooks/useAuthHandlers";
import { Link } from "react-router-dom";
import bookShelves from "../assets/bookshelves.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuthHandlers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
  <div className="w-full flex justify-center items-center min-h-screen bg-white">
    <div className="relative w-1/2 max-w-1/2">
      <img
        src={bookShelves}
        alt="bookshelves"
        className="w-full rounded-2xl shadow-md"
      />
      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
      <h1 className="absolute top-1/6 left-1/2 transform -translate-x-1/2 
                 text-white text-6xl font-bold z-20">Novelio</h1>
      <form
        onSubmit={handleSubmit}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm w-full z-10"
      >
        <h1 className="text-2xl text-center font-semibold mb-4">Welcome Back!</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <Link
            to="/signup"
            className="block mt-4 font-semibold text-center text-gray-600 hover:underline"
          >
             Sign Up for Free
          </Link>
      </form>
    </div>
  </div>
);

}
