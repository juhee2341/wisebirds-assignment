type FormatNumberProps = {
  value: number | undefined;
};

export const formatNumber = ({ value }: FormatNumberProps): string => {
  if (value === undefined || value === null) return "-"; // 값이 없을 때 처리
  return value.toLocaleString("ko-KR");
};
