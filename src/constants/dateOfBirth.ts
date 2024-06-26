export const getDays = () => {
  const days: string[] = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i > 9 ? i + "" : "0" + i);
  }
  return days;
};

export const getMonths = () => {
  const months: string[] = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i > 9 ? i + "" : "0" + i);
  }
  return months;
};

export const getYears = () => {
  const years: string[] = [];
  for (let i = 1900; i <= new Date().getFullYear(); i++) {
    years.push(i + "");
  }
  return years;
};
