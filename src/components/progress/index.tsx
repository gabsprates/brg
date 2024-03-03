import "./index.css";

type ProgressProps = {
  value: number;
  total: number;
};

export const Progress = ({ value, total }: ProgressProps) => {
  const percentage = (value * 100) / (total || 1);

  return <progress max={total} value={value} data-percentage={percentage} />;
};
