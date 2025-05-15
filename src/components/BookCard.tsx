import { Card, CardContent } from "../components/ui/card";
import type { Book } from "../types/books";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <Card
      className="flex items-center gap-4 p-4 cursor-pointer hover:shadow-lg transition-shadow border-0"
      onClick={onClick}
    >
      <img
        src={book.coverUrl}
        alt={book.title}
        className="w-20 h-28 object-cover rounded"
      />

      <CardContent className="p-0 flex-1 space-y-1">
        <h2 className="text-md font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-400">{book.year}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-sm text-gray-700">
            {book.rating.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
