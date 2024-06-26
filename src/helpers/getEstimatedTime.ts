const getEstimatedTime = () => {
  const date = new Date();

  const additionalDays = Math.floor(Math.random() * 3) + 3;

  date.setDate(date.getDate() + additionalDays);

  let day: string | number = date.getDate();
  day = day > 9 ? day : `0${day}`;

  let month: string | number = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;

  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default getEstimatedTime;
