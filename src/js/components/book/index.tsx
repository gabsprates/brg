import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "./index.scss";
import Service from "../../lib/services";

type Props = {
  book: App.Book;
  onChangeState: (data: App.BookProgress) => void;
};

export function BookContent(props: Props) {
  const { book } = props;
  const [chapters, setChapters] = useState<number[]>([]);

  useLayoutEffect(() => {
    setChapters(Service.progressOf(book.abbreviation));
  }, [book]);

  const handleChapter = (ch: number) => {
    const index = chapters.indexOf(ch);
    let newChapters = [...chapters];

    if (index < 0) {
      newChapters = newChapters.concat(ch);
    } else {
      newChapters.splice(index, 1);
    }

    props.onChangeState({
      book: props.book.abbreviation,
      total: newChapters.length
    });

    Service.save(book.abbreviation, newChapters);

    setChapters(newChapters);
  };

  return (
    <section className="book">
      <h1>{book.name}</h1>
      <h2>
        {chapters.length} capítulo{chapters.length === 1 ? "" : "s"} lido
        {chapters.length === 1 ? "" : "s"}
      </h2>

      <div className="chapters">
        {Array(book.chapters)
          .fill(null)
          .map((_, index: number) => {
            const checked = chapters.indexOf(index) >= 0;

            return (
              <label
                key={`${book.abbreviation}_${index}`}
                className={`chapter ${checked ? "on" : ""}`}
              >
                <input
                  type="checkbox"
                  name={`${book.abbreviation}_${index}`}
                  checked={checked}
                  onChange={() => handleChapter(index)}
                />
                {index + 1}
              </label>
            );
          })}
      </div>
    </section>
  );
}

export default BookContent;
