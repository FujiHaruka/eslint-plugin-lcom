exports.flat = (arr) => [].concat(...arr);

exports.last = (arr) => arr[arr.length - 1];

exports.sharesValue = (arr1, arr2) =>
  arr1.some((value) => arr2.includes(value));
