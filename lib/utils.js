exports.ArrayUtils = {
  flat: (arr) => [].concat(...arr),
  last: (arr) => arr[arr.length - 1],
  uniq: (arr) => Array.from(new Set(arr)),
};
