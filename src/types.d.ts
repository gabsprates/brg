declare namespace App {
  type BookProgress = { book: string; total: number };

  type Book = {
    name: string;
    verses: number;
    chapters: number;
    abbreviation: string;
  };
}
