const assert = require("assert").strict;
const Graph = require("../lib/graph");

describe("Graph", () => {
  it("constructor()", () => {
    const graph = new Graph([
      ["a", "b"],
      ["b", "c"],
      ["d", "a"],
      ["e", "f"],
      ["f", "e"],
    ]);
    assert.deepEqual(
      graph.edgeMap,
      new Map([
        ["a", ["b", "d"]],
        ["b", ["a", "c"]],
        ["c", ["b"]],
        ["d", ["a"]],
        ["e", ["f"]],
        ["f", ["e"]],
      ])
    );
  });

  it("countConnectedComponents()", () => {
    {
      assert.equal(
        new Graph([
          ["a", "b"],
          ["b", "c"],
          ["c", "a"],
          ["d", "a"],
        ]).countConnectedComponents(),
        1
      );
    }
    {
      assert.equal(
        new Graph([
          // component 1
          ["a", "b"],
          ["c", "d"],
          // component 2
          ["e", "f"],
          ["f", "g"],
        ]).countConnectedComponents(),
        3
      );
    }
    {
      assert.equal(
        new Graph([
          // component 1
          ["a", "b"],
          ["b", "c"],
          ["c", "d"],
          // component 2
          ["e", "f"],
          ["g", "f"],
          ["h", "g"],
          ["i", "e"],
          // component 3
          ["x", "y"],
          ["y", "z"],
          // component 4
          ["o", "o1"],
          ["o", "o2"],
          ["o", "o3"],
          ["o", "o4"],
          ["o2", "o4"],
        ]).countConnectedComponents(),
        4
      );
    }
  });
});
