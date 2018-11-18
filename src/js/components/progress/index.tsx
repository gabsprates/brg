import React from "react";

interface P {
  value: number;
}

export default ({ value }: P) => <progress max={100} value={value} />;
