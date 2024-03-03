import { useState, useEffect, useMemo, useRef } from "react";
import "./index.css";

import { Progress } from "../progress";
import { NavBar } from "../nav";
import BookContent from "../book";

interface AppProps {
  books: App.Book[];
  service: App.Service;
}

export function App({ books, service }: AppProps) {
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
    setProgress(service.getTotalProgress());
  }, [service]);

  const [dump, setDump] = useState("");
  const refDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!dump) return;
    refDialog.current?.showModal();
  }, [dump]);

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

  const exportData = async () => {
    try {
      const bookKeys = books.map(({ abbreviation }) => abbreviation);
      const dump = await service.dump(bookKeys);

      setDump(JSON.stringify(dump));
    } catch (e) {
      console.error(e);
    }
  };

  const importData = async () => {
    try {
      const db = prompt("db", "") ?? "";
      await service.loadBatch(JSON.parse(db));

      setProgress(service.getTotalProgress());
      setBook(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <header>
        <h1 onClick={() => setBook(null)}>Minha Leitura Bíblica</h1>

        <Progress value={calcProgress()} total={totalChapters} />

        <div style={{ paddingTop: "1rem" }}>
          <button onClick={() => exportData()}>export</button>
          <button onClick={() => importData()}>import</button>
        </div>
      </header>

      <div className="container">
        <NavBar books={books} onSelect={setBook} selected={book} />

        {book ? (
          <BookContent
            book={book}
            service={service}
            onChangeState={onChangeState}
          />
        ) : (
          <h1>selecione um livro</h1>
        )}
      </div>

      <dialog ref={refDialog} className="dialog">
        <pre>{dump}</pre>

        <br />

        <button
          autoFocus
          onClick={() => {
            refDialog.current?.close();
            setDump("");
          }}
        >
          Close
        </button>
      </dialog>
    </div>
  );
}
