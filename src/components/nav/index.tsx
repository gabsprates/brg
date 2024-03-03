import { Fragment } from "react";
import "./index.css";

type PropsType = {
  books: App.Book[];
  onSelect: (book: null | App.Book) => void;
  selected: null | App.Book;
};

export function NavBar({ books, onSelect, selected }: PropsType) {
  const css = (book: App.Book) =>
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
