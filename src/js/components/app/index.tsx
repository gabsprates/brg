import React, { useState, useEffect } from "react";
import "./index.scss";

import Progress from "../progress";
import { Book } from "../../lib/books";
import { BookContent } from "../book";
import { NavBar } from "../nav";
import Service from "../../lib/services";

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
        {book ? <BookContent book={book} /> : <h1>selecione um livro</h1>}
      </div>
    </div>
  );
}
