exports.flat = (arr) => [].concat(...arr);

exports.last = (arr) => arr[arr.length - 1];

exports.uniq = (arr) => Array.from(new Set(arr));

exports.sharesValue = (arr1, arr2) =>
  arr1.some((value) => arr2.includes(value));
