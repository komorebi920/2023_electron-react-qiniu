export const flattenArr = (arr) =>
  arr.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});

export const objToArr = (obj) => Object.keys(obj).map((key) => obj[key]);
