import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { User, UserCredential } from "firebase/auth";
import { getAuth as getFirebaseAuth } from "firebase/auth";
import * as authHelpers from "../lib/authHelpers";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
}

// No-op default functions for safety
const noopSignup = (email: string, password: string) =>
  Promise.reject(new Error("Signup function not initialized"));
const noopLogin = (email: string, password: string) =>
  Promise.reject(new Error("Login function not initialized"));
const noopLogout = () => Promise.resolve();

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signup: noopSignup,
  login: noopLogin,
  logout: noopLogout,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log("Firebase User:", firebaseUser);  // <-- Add this line here
  
      setUser(firebaseUser);
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult(true);
        setIsAdmin(!!idTokenResult.claims.admin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      const userCredential = await authHelpers.signup(email, password);
      setUser(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      const userCredential = await authHelpers.login(email, password);
      setUser(userCredential.user);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authHelpers.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
