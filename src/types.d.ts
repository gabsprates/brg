declare namespace App {
  type BookProgress = { book: string; total: number };

  type Book = {
    name: string;
    verses: number;
    chapters: number;
    abbreviation: string;
  };

  interface Service {
    getTotalProgress(): { [book in string]: number };
    setTotalProgress(data: { [book in string]: number }): void;
    save(book: string, chapters: number[]): Promise<void>;
    progressOf(book: string): number[];
  }
}
