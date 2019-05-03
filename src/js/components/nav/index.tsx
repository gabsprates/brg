import React, { useState, useEffect } from "react";
import "./index.scss";

import books, { Book } from "../../lib/books";

type PropsType = { onClick: Function; selected: null | Book };

export function NavBar({ onClick, selected }: PropsType) {
  const css = (book: Book) =>
    selected && selected.name === book.name ? "selected" : "";

  return (
    <nav>
      {books.map(book => (
        <p key={book.name} onClick={() => onClick(book)} className={css(book)}>
          {book.name}
        </p>
      ))}
    </nav>
  );
}
