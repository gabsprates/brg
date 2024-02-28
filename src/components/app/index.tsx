import { useState, useEffect, Suspense, lazy } from "react";
import "./index.css";

import Service from "../../lib/services";
import Progress from "../progress";
import { NavBar } from "../nav";
const BookContent = lazy(() => import("../book"));

export default function App() {
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

  console.log(exportToClipboard, importDatabase);

  return (
    <div>
      <header>
        <h1 onClick={() => setBook(null)}>Minha Leitura Bíblica</h1>
        <Progress value={calcProgress()} />

        <button onClick={alert}>export</button>
        <button onClick={alert}>import</button>
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
