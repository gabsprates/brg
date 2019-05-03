import React, { useState, useEffect, Suspense } from "react";
import "./index.scss";

import { Book } from "../../lib/books";
import Service from "../../lib/services";
import Progress from "../progress";
import { NavBar } from "../nav";
const BookContent = React.lazy(() => import("../book"));

export default function App() {
  const [book, setBook] = useState<null | Book>(null);

  useEffect(() => {
    console.log("atualizou app", Date.now());
    if (book) {
      document.title = `${book.name} - My Biblical Reading`;
    }
  });

  useEffect(() => {
    console.log(Service.showProgress());
  }, []);

  return (
    <div>
      <header>
        <h1 onClick={() => setBook(null)}>my biblical reading</h1>
        <Progress value={0} />
      </header>

      <div className="container">
        <NavBar onClick={setBook} selected={book} />
        <Suspense fallback={<h1>loading...</h1>}>
          {book ? <BookContent book={book} /> : <h1>selecione um livro</h1>}
        </Suspense>
      </div>
    </div>
  );
}
