const assert = require("assert").strict;
const { last, flat, uniq, sharesValue } = require("../lib/utils");

describe("utils", () => {
  it("last()", () => {
    assert.equal(last([1, 2, 3, 4]), 4);
  });

  it("flat()", () => {
    assert.deepEqual(
      flat([
        ["a", "b"],
        ["c", "d"],
      ]),
      ["a", "b", "c", "d"]
    );
  });

  it("sharesValue()", () => {
    assert.equal(sharesValue([1, 2, 3], [3, 4, 5]), true);
    assert.equal(sharesValue([1, 2, 3], [4, 5, 6]), false);
  });
});
