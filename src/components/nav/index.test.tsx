import { render, screen, within } from "@testing-library/react";
import { NavBar } from ".";

describe("Component: NavBar", () => {
  const books: App.Book[] = [
    { abbreviation: "Aa", chapters: 10, name: "A Book", verses: 10 * 10 },
    { abbreviation: "Bb", chapters: 20, name: "B Book", verses: 10 * 20 },
    { abbreviation: "Cc", chapters: 30, name: "C Book", verses: 10 * 30 },
    { abbreviation: "Dd", chapters: 40, name: "D Book", verses: 10 * 40 },
  ];

  it("should render navbar with one item per book", () => {
    render(<NavBar books={books} onSelect={vi.fn()} selected={null} />);

    const navbar = screen.getByRole("navigation");
    const items = within(navbar).getAllByRole("listitem");
    expect(items).toHaveLength(books.length);

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(books[index].name);
    });
  });

  it("should render select with one option per book", () => {
    render(<NavBar books={books} onSelect={vi.fn()} selected={null} />);

    const navbar = screen.getByRole("combobox");
    const [empty, ...items] = within(navbar).getAllByRole("option");

    expect(items).toHaveLength(books.length);

    expect(empty).toHaveTextContent(/selecione/i);

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(books[index].name);
    });
  });
});
