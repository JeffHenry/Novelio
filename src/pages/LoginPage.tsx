import { useState } from "react";
import { useAuthHandlers } from "../hooks/useAuthHandlers";
import heroImage from "../assets/hero-image.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuthHandlers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="w-full text-center">
      <img
        src={heroImage}
        alt="Hero image"
        className="mx-auto mb-4 max-h-64 object-contain shadow rounded"
      />

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto p-4">
        <h1>Welcome Back!</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">
          Log In
        </button>
      </form>
    </div>
  );
}
