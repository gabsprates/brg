import React, { useState } from "react";
import "./index.scss";

import { Book } from "../../lib/books";

export function BookContent(props: { book: Book }) {
  const { book } = props;
  const [chapters, setChapter] = useState<number[]>([]);

  const handleChapter = (ch: number) => {
    const index = chapters.indexOf(ch);
    if (index >= 0) {
      const newChapters = [...chapters];
      newChapters.splice(index, 1);
      setChapter(newChapters);
    } else {
      setChapter(chapters.concat(ch));
    }
  };

  return (
    <section className="book">
      <h1>{book.name}</h1>
      <h2>
        ({chapters.length}) capítulo{chapters.length === 1 ? "" : "s"} lido
        {chapters.length === 1 ? "" : "s"}
      </h2>

      <div className="chapters">
        {Array(book.chapters)
          .fill(null)
          .map((_, index: number) => (
            <label key={`${book.abbreviation}_${index}`} className="chapter">
              <input
                type="checkbox"
                name={`${book.abbreviation}_${index}`}
                onClick={() => handleChapter(index)}
              />
              {index + 1}
            </label>
          ))}
      </div>
    </section>
  );
}

export default BookContent;
