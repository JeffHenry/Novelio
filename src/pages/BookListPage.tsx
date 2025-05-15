import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../firebase/books";
import type { Book } from "../types/books";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

export default function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "author" | "rating" | "year">(
    "title"
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks().then(setBooks).catch(console.error);
  }, [search, books]);

  const filteredBooks = books
    .filter((book) =>
      `${book.title} ${book.author} ${book.isbn}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "year") {
        return Number(b.year) - Number(a.year);
      } else if (sortBy === "author") {
        const lastA = a.author.split(" ").slice(-1)[0].toLowerCase();
        const lastB = b.author.split(" ").slice(-1)[0].toLowerCase();
        return lastA.localeCompare(lastB);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="space-y-4 max-w-4xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "title" | "author" | "rating" | "year")
          }
          className="border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="rating">Sort by Rating</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.isbn || book.title}
            book={book}
            onClick={() => navigate(`/books/${book.isbn}`)}
          />
        ))}
      </div>
    </div>
  );
}
