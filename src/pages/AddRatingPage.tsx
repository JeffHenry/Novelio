import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, push, get, update} from "firebase/database";
import { db } from "../firebase/firebase";
import type { Book } from "../types/books";

export default function AddRatingPage() {
  const { isbn } = useParams<{ isbn: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isbn) return;

    // Fetch book details to show title, etc.
    const bookRef = ref(db, `books/${isbn}`);
    get(bookRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setBook({ isbn, ...data });
      } else {
        setBook(null);
      }
      setLoading(false);
    });
  }, [isbn]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isbn) return;

    try {
      const reviewsRef = ref(db, `books/${isbn}/reviews`);
      await push(reviewsRef, { text, rating: Number(rating) });

      // Fetch all reviews again to recalc average
      const snapshot = await get(reviewsRef);
      if (snapshot.exists()) {
        const reviewsObj = snapshot.val();
        const reviews = Object.values(reviewsObj) as Array<{ rating: number }>;

        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = totalRating / reviews.length;

        // Update average rating on the book node
        const bookRef = ref(db, `books/${isbn}`);
        await update(bookRef, { rating: avgRating });
      }
      navigate(`/books/${isbn}`);
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review, please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Add Rating for "{book.title}"</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="rating">
            Rating (1-5)
          </label>
          <input
            id="rating"
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="text">
            Review Text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded w-full"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
