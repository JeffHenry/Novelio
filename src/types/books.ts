export interface Review {
  rating: number;
  text: string;
}

export interface Book {
  coverUrl: string;
  year: string;
  isbn: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  reviews: { text: string; rating: number }[];
}
