import { memo } from "react";
import { totalChapters } from "../../lib/books";

import "./index.css";

type P = {
  value: number;
};

const Progress = memo(({ value }: P) => {
  const percentage = (value * 100) / totalChapters;

  return (
    <progress max={totalChapters} value={value} data-percentage={percentage} />
  );
});

export default Progress;
