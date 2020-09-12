const assert = require("assert").strict;
const Graph = require("../lib/graph");
const { flat } = require("../lib/utils");

describe("Graph", () => {
  it("constructor()", () => {
    const edges = [
      ["a", "b"],
      ["b", "c"],
      ["d", "a"],
      ["e", "f"],
      ["f", "e"],
    ];
    const nodes = new Set(flat(edges));
    const graph = new Graph(nodes, edges);
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
      const edges = [
        ["a", "b"],
        ["b", "c"],
        ["c", "a"],
        ["d", "a"],
      ];
      const nodes = new Set(flat(edges));
      assert.equal(new Graph(nodes, edges).countConnectedComponents(), 1);
    }
    {
      const edges = [
        // component 1
        ["a", "b"],
        ["c", "d"],
        // component 2
        ["e", "f"],
        ["f", "g"],
      ];
      const nodes = new Set(flat(edges));
      assert.equal(new Graph(nodes, edges).countConnectedComponents(), 3);
    }
    {
      const edges = [
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
      ];
      const nodes = new Set(flat(edges));
      assert.equal(new Graph(nodes, edges).countConnectedComponents(), 4);
    }
  });

  it("static calcLCOM()", () => {
    {
      assert.equal(Graph.calcLCOM([]), 0);
    }
    {
      assert.equal(
        Graph.calcLCOM([
          {
            name: "method1",
            properties: ["a", "b"],
          },
          {
            name: "method2",
            properties: ["c", "b"],
          },
        ]),
        1
      );
    }
    {
      assert.equal(
        Graph.calcLCOM([
          {
            name: "method1",
            properties: ["a", "b"],
          },
          {
            name: "method2",
            properties: ["c", "b"],
          },
          {
            name: "method3",
            properties: ["d"],
          },
        ]),
        2
      );
    }
    {
      assert.equal(
        Graph.calcLCOM([
          {
            name: "method1",
            properties: ["method3"],
          },
          {
            name: "method2",
            properties: ["method3"],
          },
          {
            name: "method3",
            properties: ["a"],
          },
        ]),
        1
      );
    }
  });
});
