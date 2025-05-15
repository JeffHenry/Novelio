// src/firebase/books.ts
import { getDatabase, ref, get, set, update, child, remove } from "firebase/database";
import { app } from "./firebase";
import type { Book } from "../types/books";

const db = getDatabase(app);

export async function deleteBookByISBN(isbn: string): Promise<void> {
  const db = getDatabase();
  const bookRef = ref(db, `books/${isbn}`);
  await remove(bookRef);
}

export async function updateBook(isbn: string, data: Partial<Book>) {
    try {
      const bookRef = ref(db, `books/${isbn}`);
      await update(bookRef, data);
    } catch (error) {
      console.error("Failed to update book:", error);
      throw error;
    }
  }

export async function fetchBookByISBN(isbn: string): Promise<Book | null> {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `books/${isbn}`));
  if (snapshot.exists()) {
    return snapshot.val() as Book;
  } else {
    return null;
  }
}

export async function fetchBooks(): Promise<Book[]> {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "books"));
  
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([isbn, bookData]) => ({
        isbn,
        ...(bookData as Omit<Book, "isbn">),
      }));
    } else {
      return [];
    }
  }

export async function addBook(book: Book): Promise<void> {
  const db = getDatabase();
  const bookRef = ref(db, `books/${book.isbn}`);
  await set(bookRef, book);
}

