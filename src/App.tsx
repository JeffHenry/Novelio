import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext";

// Pages
import TopNav from "./components/TopNav";
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetailPage";
import AddRatingPage from "./pages/AddRatingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AddBookPage from "./pages/AddBookPage";
import UnauthorizedPage from "./pages/UnAuthorizedPage";

// Routes
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <TopNav />
        <main className="mt-6">
          <Routes>
            <Route path="/" element={<Navigate to="/books" replace />} />

            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BookListPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/books/:isbn"
              element={
                <ProtectedRoute>
                  <BookDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/books/:isbn/add-rating"
              element={
                <ProtectedRoute>
                  <AddRatingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />
            <Route
              path="/books/add"
              element={
                <ProtectedAdminRoute>
                  <AddBookPage />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
