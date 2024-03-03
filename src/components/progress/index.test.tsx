import { Progress } from ".";
import { render, screen } from "@testing-library/react";

describe("Component: Progess", () => {
  it("should render progress bar", () => {
    render(<Progress value={0} total={0} />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });

  it("should render progress bar with right max", () => {
    render(<Progress value={0} total={100} />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveAttribute("max", "100");
  });

  it("should render progress bar with right value", () => {
    render(<Progress value={50} total={100} />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveValue(50);
    expect(progress).toHaveAttribute("data-percentage", "50");
  });
});
