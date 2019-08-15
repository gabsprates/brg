import React, { useState, useEffect, Suspense } from "react";
import "./index.scss";

import Service from "../../lib/services";
import Progress from "../progress";
import { NavBar } from "../nav";
const BookContent = React.lazy(() => import("../book"));

export default function App() {
  const [book, setBook] = useState<null | App.Book>(null);
  useEffect(() => {
    if (book) {
      document.title = `${book.name} - Minha Leitura Bíblica`;
    }
  }, [book]);

  const [progress, setProgress] = useState<{ [book in string]: number }>({});
  useEffect(() => {
    setProgress(Service.getTotalProgress());
  }, []);

  const onChangeState = ({ book, total }: App.BookProgress) => {
    setProgress({
      ...progress,
      [book]: total
    });
  };

  const calcProgress = (): number => {
    return Object.entries(progress).reduce(
      (total, [, bookTotal]) => total + bookTotal,
      0
    );
  };

  return (
    <div>
      <header>
        <h1 onClick={() => setBook(null)}>Minha Leitura Bíblica</h1>
        <Progress value={calcProgress()} />
      </header>

      <div className="container">
        <NavBar onSelect={setBook} selected={book} />
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
