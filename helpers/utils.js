export const range = (min, max) => {
  // both inclusive
  const arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  return arr;
};
export const randomInRange = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
export const modFunc = (val) => {
  return function (x) {
    return Math.abs(x - val);
  };
};
