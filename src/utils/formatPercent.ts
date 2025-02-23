type FormatNumberProps = {
  value: number | undefined;
};

export const formatPercent = ({ value }: FormatNumberProps) => {
  if (value === undefined || value === null) return "-"; // 값이 없을 때 처리
  return `${value.toFixed(3)}%`;
};
