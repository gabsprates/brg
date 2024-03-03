import { useState, useLayoutEffect } from "react";
import "./index.css";

type BookContentProps = {
  book: App.Book;
  service: App.Service;
  onChangeState: (data: App.BookProgress) => void;
};

export function BookContent({
  book,
  service,
  onChangeState,
}: BookContentProps) {
  const [chapters, setChapters] = useState<number[]>([]);

  useLayoutEffect(() => {
    setChapters(service.progressOf(book.abbreviation));
  }, [book, service]);

  const handleChapter = (ch: number) => {
    const index = chapters.indexOf(ch);
    let newChapters = [...chapters];

    if (index < 0) {
      newChapters = newChapters.concat(ch);
    } else {
      newChapters.splice(index, 1);
    }

    onChangeState({
      book: book.abbreviation,
      total: newChapters.length,
    });

    service.save(book.abbreviation, newChapters);

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
