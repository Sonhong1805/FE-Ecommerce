const randomId = (): number => {
  const number = Math.floor(Math.random() * 1000000000000000);
  return number;
};

export default randomId;
