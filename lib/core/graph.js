const { sharesValue } = require("./utils");

class Graph {
  constructor(nodes, edges) {
    const edgeMap = new Map();
    for (const node of nodes) {
      const related = new Set();
      for (const [from, to] of edges) {
        if (from === node) {
          related.add(to);
        }
        if (to === node) {
          related.add(from);
        }
      }
      edgeMap.set(node, Array.from(related));
    }

    this.nodes = nodes;
    this.edgeMap = edgeMap;
  }

  countConnectedComponents() {
    const { nodes, edgeMap } = this;
    const visiting = new Map(Array.from(nodes).map((node) => [node, false]));
    let count = 0;
    for (const root of nodes.values()) {
      const visited = visiting.get(root);
      if (visited) {
        continue;
      }
      // 探索回数を数える
      count++;
      // 幅優先探索
      let search = [root];
      do {
        const parent = search.shift();
        visiting.set(parent, true);
        const newNodes = edgeMap
          .get(parent)
          .filter((node) => !visiting.get(node));
        search = search.concat(newNodes);
      } while (search.length > 0);
    }
    return count;
  }

  static calcLCOM(methods) {
    const nodes = new Set(methods.map(({ name }) => name));
    const edges = [];
    for (const method1 of methods) {
      for (const method2 of methods) {
        if (method1.name === method2.name) {
          continue;
        }
        const shares = sharesValue(
          [method1.name, ...method1.properties],
          [method2.name, ...method2.properties]
        );
        if (shares) {
          edges.push([method1.name, method2.name]);
        }
      }
    }
    const graph = new Graph(nodes, edges);
    return graph.countConnectedComponents();
  }
}

module.exports = Graph;
