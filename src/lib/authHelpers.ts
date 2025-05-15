import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
  } from "firebase/auth";
  import { auth } from "../firebase/firebase";
  
  interface FirebaseError {
    code: string;
    message?: string;
  }
  
  // Type guard to check if error is FirebaseError
  function isFirebaseError(error: unknown): error is FirebaseError {
    return typeof error === "object" && error !== null && "code" in error;
  }
  
  export async function signup(email: string, password: string) {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        throw new Error(getErrorMessage(error.code));
      }
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
  
  export async function login(email: string, password: string) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        throw new Error(getErrorMessage(error.code));
      }
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
  
  export async function logout() {
    return signOut(auth);
  }
  
  // Helper to convert Firebase error codes to messages
  function getErrorMessage(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  }
  