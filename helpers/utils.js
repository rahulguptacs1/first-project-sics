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
export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const conditionalLog = (log = true, groups = { consume: false }) => {
  // set log to false to log nothing
  const g = {};
  Object.keys(groups).forEach((key) => {
    g[key] = key;
  });
  return {
    c: (val, group) => {
      if (!log) return val;
      if (group !== undefined && Object.keys(groups).length) {
        if (groups[group]) {
          console.log(val);
        }
      } else {
        console.log(val);
      }

      return val;
    },
    ...g,
  };
};
