declare namespace App {
  type BookProgress = { book: string; total: number };

  type Book = {
    name: string;
    verses: number;
    chapters: number;
    abbreviation: string;
  };

  interface Service {
    getTotalProgress(): Record<string, number>;
    setTotalProgress(data: Record<string, number>): void;
    save(book: string, chapters: number[]): Promise<void>;
    progressOf(book: string): number[];
    dump(bookKeys: string[]): Promise<{
      total: Record<string, number>;
      books: Record<string, number[]>;
    }>;
  }
}
