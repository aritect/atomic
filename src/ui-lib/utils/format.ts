const formatSize = (bytes: number): string => {
  const units = [
    "byte", "kilobyte", "megabyte", "gigabyte", "terabyte",
  ];

  const unitIndex = Math.max(
    0,
    Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1),
  );

  return Intl.NumberFormat("en-US", {
    style: "unit",
    unit: units[unitIndex],
  }).format(Number(Math.round((bytes / 1024) ** unitIndex)));
};

const secondsToHoursAndMinutes = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours) {
    return `${hours}h`;
  }

  if (minutes) {
    return `${minutes}m`;
  }

  return "0h";
};

const minorFormatChartValueLabel = (value: number, symbol: string = ""): string => {
  if (value >= 0) {
    return symbol + "\u00A0" + value;
  }

  const absValue = Math.abs(value);

  return "-\u00A0" + symbol + "\u00A0" + absValue;
};

export { formatSize, secondsToHoursAndMinutes, minorFormatChartValueLabel };
