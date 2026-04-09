import { Fragment } from "react";
import "./index.css";
import type { Book } from "../../types";

type PropsType = {
  books: Book[];
  onSelect: (book: null | Book) => void;
  selected: null | Book;
};

export function NavBar({ books, onSelect, selected }: PropsType) {
  const css = (book: Book) =>
    selected && selected.name === book.name ? "selected" : "";

  return (
    <Fragment>
      <nav className="nav">
        <ul>
          {books.map((book) => (
            <li
              key={"p" + book.name}
              onClick={() => onSelect(book)}
              className={css(book)}
            >
              {book.name}
            </li>
          ))}
        </ul>
      </nav>

      <select
        onChange={(e) => {
          onSelect(e.target.value ? books[+e.target.value] : null);
        }}
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
    </Fragment>
  );
}
