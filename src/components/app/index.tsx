import { useState, useEffect, Suspense, useMemo } from "react";
import "./index.css";

import Service from "../../lib/services";
import { Progress } from "../progress";
import { NavBar } from "../nav";
import BookContent from "../book";

interface AppProps {
  books: App.Book[];
}

export function App({ books }: AppProps) {
  const [book, setBook] = useState<null | App.Book>(null);
  useEffect(() => {
    const title = "Minha Leitura Bíblica";

    if (book) {
      document.title = `${book.name} - ${title}`;
    } else {
      document.title = title;
    }
  }, [book]);

  const [progress, setProgress] = useState<{ [book in string]: number }>({});
  useEffect(() => {
    setProgress(Service.getTotalProgress());
  }, []);

  const totalChapters = useMemo(() => {
    return books.reduce((prev, current) => prev + current.chapters, 0);
  }, [books]);

  const onChangeState = ({ book, total }: App.BookProgress) => {
    setProgress({
      ...progress,
      [book]: total,
    });
  };

  const calcProgress = (): number => {
    return Object.entries(progress).reduce(
      (total, [, bookTotal]) => total + bookTotal,
      0
    );
  };

  const exportToClipboard = async () => {
    try {
      const dump = "x";
      await navigator.clipboard.writeText(dump);
      alert(dump);
    } catch (e) {
      console.log(e);
    }
  };

  const importDatabase = async () => {
    const db = prompt();
    console.log(db);
  };

  return (
    <div>
      <header>
        <h1 onClick={() => setBook(null)}>Minha Leitura Bíblica</h1>
        <Progress value={calcProgress()} total={totalChapters} />

        <button onClick={() => exportToClipboard()}>export</button>
        <button onClick={() => importDatabase()}>import</button>
      </header>

      <div className="container">
        <NavBar books={books} onSelect={setBook} selected={book} />
        <Suspense fallback={<h1>loading...</h1>}>
          {book ? (
            <BookContent book={book} onChangeState={onChangeState} />
          ) : (
            <h1>selecione um livro</h1>
          )}
        </Suspense>
      </div>
    </div>
  );
}
