const getTime = () => {
  const date = new Date();

  let day: string | number = date.getDate();
  day = day > 9 ? day : `0${day}`;

  let month: string | number = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;

  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export default getTime;
