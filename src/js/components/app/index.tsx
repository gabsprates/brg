import React from "react";
import "./index.css";

import Progress from "../progress";
import books, { Book } from "../../lib/books";
import Service from "../../lib/services";

interface State {
  book: null | Book;
}

export default class App extends React.Component<{}, State> {
  state = {
    book: null
  };

  setChapters = (book: Book) => {
    this.setState({ book });
  };

  componentWillMount() {
    console.log(Service.showProgress());
  }

  render() {
    return (
      <div>
        <header>
          <h1>my biblical reading</h1>
          <Progress value={0} />
        </header>

        <div className="container">
          <nav>
            {books.map(book => (
              <p key={book.name} onClick={() => this.setChapters(book)}>
                {book.name}
              </p>
            ))}
          </nav>

          {this.state.book ? (
            <section className="book">
              <h1>{this.state.book.name}</h1>
              {Array(this.state.book.chapters)
                .fill(null)
                .map((_, index: number) => (
                  <label key={`${this.state.book.abbreviation}_${index}`}>
                    <input
                      type="checkbox"
                      name={`${this.state.book.abbreviation}_${index}`}
                    />
                    {index}
                  </label>
                ))}
            </section>
          ) : (
            <h1>selecione um livro</h1>
          )}
        </div>
      </div>
    );
  }
}
