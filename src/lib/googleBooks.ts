import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase/firebase";
import type { Book } from "../types/books";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";

export interface GoogleBook {
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  year: string;
}

export async function searchGoogleBooksByISBN(
  isbn: string
): Promise<GoogleBook | null> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const volume = data.items[0].volumeInfo;

    return {
      title: volume.title || "",
      author: (volume.authors && volume.authors.join(", ")) || "",
      description: volume.description || "",
      coverUrl: (
        volume.imageLinks?.thumbnail ||
        volume.imageLinks?.smallThumbnail ||
        ""
      ).replace("http://", "https://"),
      year: volume.publishedDate ? volume.publishedDate.split("-")[0] : "",
    };
  } catch (error) {
    console.error("Failed to fetch from Google Books API:", error);
    return null;
  }
}

export async function searchGoogleBooks(query: string) {
  const response = await fetch(
    `${GOOGLE_BOOKS_API}${encodeURIComponent(query)}`
  );
  if (!response.ok) throw new Error("Failed to fetch from Google Books API");

  const data = await response.json();
  return data.items || [];
}

function transformGoogleBook(item: any): Book | null {
  const volume = item.volumeInfo;
  if (!volume.title || !volume.authors?.length) return null;

  const book: Book = {
    title: volume.title,
    author: volume.authors.join(", "),
    description: volume.description || "No description available.",
    isbn: extractISBN(volume.industryIdentifiers) ?? "",
    rating: volume.averageRating || 0,
    year: volume.publishedDate?.substring(0, 4) || "Unknown",
    coverUrl: volume.imageLinks?.thumbnail || "",
    reviews: [],
  };

  if (!book.isbn) return null;
  return book;
}

function extractISBN(identifiers: any[] = []): string | null {
  const isbn13 = identifiers.find((id) => id.type === "ISBN_13");
  const isbn10 = identifiers.find((id) => id.type === "ISBN_10");
  return isbn13?.identifier || isbn10?.identifier || null;
}

export async function addGoogleBookToFirebase(item: any): Promise<void> {
  const book = transformGoogleBook(item);
  if (!book) throw new Error("Invalid book data");

  const db = getDatabase(app);
  const bookRef = ref(db, `books/${book.isbn}`);
  await set(bookRef, book);
}
