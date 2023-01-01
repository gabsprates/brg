import React from "react";
import { totalChapters } from "../../lib/books";

import "./index.scss";

type P = {
  value: number;
};

const Progress = React.memo(({ value }: P) => {
  const percentage = (value * 100) / totalChapters;

  return (
    <progress max={totalChapters} value={value} data-percentage={percentage} />
  );
});

export default Progress;
