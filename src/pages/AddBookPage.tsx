import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../firebase/books";
import type { Book } from "../types/books";
import { searchGoogleBooksByISBN } from "../lib/googleBooks";

export default function AddBookPage() {
  const navigate = useNavigate();
  const [lookupError, setLookupError] = useState("");
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    description: "",
    rating: 0,
    isbn: "",
    year: "",
    coverUrl: "",
    reviews: [],
  });

  const handleLookup = async () => {
    if (!form.isbn) {
      setLookupError("Please enter an ISBN first.");
      return;
    }

    try {
      const bookData = await searchGoogleBooksByISBN(form.isbn);
      if (!bookData.title) {
        setLookupError("Book not found.");
        return;
      }

      setLookupError("");
      setForm((prev) => ({
        ...prev,
        title: bookData.title || "",
        author: bookData.author || "",
        description: bookData.description || "",
        coverUrl: bookData.coverUrl || "",
        year: bookData.year || "",
      }));
    } catch (err) {
      console.error("Lookup failed:", err);
      setLookupError("Please enter a valid ISBN.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBook(form);
      navigate("/books");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="block font-medium mb-1">ISBN</label>
          <input
            type="text"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleLookup}
          className="h-[42px] px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Lookup
        </button>
      </div>
      {lookupError && (
        <p className="text-red-600 text-sm mt-2">{lookupError}</p>
      )}

      {form.coverUrl && (
        <div className="w-full text-center">
          <img
            src={form.coverUrl}
            alt="Book Cover"
            className="mx-auto mb-4 max-h-64 object-contain shadow rounded"
          />
        </div>
      )}

      <h1 className="text-2xl font-bold text-center">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="year"
          placeholder="Publication Year"
          value={form.year}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="coverUrl"
          placeholder="Cover Image URL"
          value={form.coverUrl}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="rating"
          placeholder="rating"
          value={form.rating}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/books")}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
