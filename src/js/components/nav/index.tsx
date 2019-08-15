import React from "react";
import "./index.scss";

import books from "../../lib/books";

type PropsType = {
  onSelect: (book: null | App.Book) => void;
  selected: null | App.Book;
};

export function NavBar({ onSelect, selected }: PropsType) {
  const css = (book: App.Book) =>
    selected && selected.name === book.name ? "selected" : "";

  return (
    <React.Fragment>
      <nav className="nav">
        {books.map(book => (
          <p
            key={"p" + book.name}
            onClick={() => onSelect(book)}
            className={css(book)}
          >
            {book.name}
          </p>
        ))}
      </nav>
      <select
        onChange={e => onSelect(e.target.value ? books[+e.target.value] : null)}
        className="select"
        defaultValue=""
      >
        <option value="">Selecione um livro</option>
        {books.map((book, index) => (
          <option key={"o" + book.name} value={index}>
            {book.name}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}
