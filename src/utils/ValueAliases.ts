import Thousand from './Thousand';

export const ValueAliases = (data: number | string) => {
  const value = Number(data);
  if (value > 1000000000) {
    const billion = value / 1000000000;
    return Thousand(billion.toFixed(2)) + 'B';
  } else if (value > 1000000) {
    const million = value / 1000000;
    return Thousand(million.toFixed(2)) + 'M';
  } else if (value > 1000) {
    const thousand = value / 1000;
    return Thousand(thousand.toFixed(2)) + 'M';
  } else {
    return Thousand(value);
  }
};
