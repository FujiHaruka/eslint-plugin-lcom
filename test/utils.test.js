const assert = require("assert").strict;
const { ArrayUtils } = require("../lib/utils");

describe("utils", () => {
  it("ArrayUtils.last()", () => {
    assert.equal(ArrayUtils.last([1, 2, 3, 4]), 4);
  });

  it("ArrayUtils.flat()", () => {
    assert.deepEqual(
      ArrayUtils.flat([
        ["a", "b"],
        ["c", "d"],
      ]),
      ["a", "b", "c", "d"]
    );
  });

  it("ArrayUtils.uniq()", () => {
    assert.deepEqual(ArrayUtils.uniq([1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5]), [
      1,
      2,
      3,
      4,
      5,
    ]);
  });
});
