/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useAuthHandlers() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/books");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    }
  }

  async function handleSignup(email: string, password: string) {
    try {
      await signup(email, password);
      toast.success("Signup successful!");
      navigate("/books");
    } catch (error: any) {
      toast.error(error.message || "Signup failed");
    }
  }

  return { handleLogin, handleSignup };
}
