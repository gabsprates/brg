import React from "react";
import { totalChapters } from "../../lib/books";

import "./index.scss";

type P = {
  value: number;
};

const Progress = React.memo(({ value }: P) => (
  <progress max={totalChapters} value={value} />
));

export default Progress;
