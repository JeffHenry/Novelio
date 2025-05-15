import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchBookByISBN } from "../firebase/books";
import { useAuth } from "../context/AuthContext";
import { deleteBookByISBN } from "../firebase/books";
import { updateBook } from "../firebase/books";
import type { Book, Review } from "../types/books";

const REVIEWS_PER_PAGE = 3;

export default function BookDetailPage() {
  const { isbn } = useParams<{ isbn: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [page, setPage] = useState(0);
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    if (!isbn) return;
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await deleteBookByISBN(isbn);
      navigate("/books");
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Failed to delete book. Try again later.");
    }
  };

  useEffect(() => {
    if (isbn) {
      fetchBookByISBN(isbn)
        .then((book) => {
          setBook(book);
          setPage(0); // Reset to page 0 when book changes
        })
        .catch(console.error);
    }
  }, [isbn]);

  if (!book) {
    return <div className="text-center text-red-500">Book not found.</div>;
  }

  const reviews: Review[] = Array.isArray(book.reviews)
    ? book.reviews
    : Object.values(book.reviews || {}); // handles object-style reviews from Realtime DB

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const pagedReviews = reviews.slice(
    page * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow space-y-4">
      <button className="text-blue-600 underline" onClick={() => navigate("/")}>
        ← Back to List
      </button>
      {book.coverUrl && (
        <div className="w-full text-center">
          <img
            src={book.coverUrl}
            alt="Book Cover"
            className="mx-auto mb-4 max-h-64 object-contain shadow rounded"
          />
        </div>
      )}
      <p className="text-gray-600">by {book.author}</p>
      <p className="text-sm text-gray-400">ISBN: {book.isbn}</p>
      <p>{book.description}</p>

      <p className="text-yellow-500 font-medium">
        Rating: {book.rating.toFixed(1)} ⭐
      </p>

      <Link
        to={`/books/${isbn}/add-rating`}
        className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add a Review
      </Link>
      <div className="inline mx-5">
      {isAdmin && (
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete Book
          </button>
        )}
      </div>

      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold">Reviews</h2>

        {pagedReviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          pagedReviews.map((review, idx) => {
            const globalIndex = page * REVIEWS_PER_PAGE + idx;
            return (
              <div
                key={globalIndex}
                className="border p-3 rounded shadow-sm relative"
              >
                <p className="mb-1">{review.text}</p>
                <p className="text-sm text-yellow-600 font-medium">
                  Rating: {review.rating} ⭐
                </p>
              </div>
            );
          })
        )}

        

        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
