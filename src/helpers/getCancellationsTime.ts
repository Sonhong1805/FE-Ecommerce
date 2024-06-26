const getCancellationsTime = () => {
  const date = new Date();

  let second: number | string = date.getSeconds();
  second = second > 9 ? second : `0${second}`;

  let minute: number | string = date.getMinutes();
  minute = minute > 9 ? minute : `0${minute}`;

  let hour: number | string = date.getHours();
  hour = hour > 9 ? hour : `0${hour}`;

  let day: number | string = date.getDate();
  day = day > 9 ? day : `0${day}`;

  let month: number | string = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;

  let year = date.getFullYear();

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default getCancellationsTime;
