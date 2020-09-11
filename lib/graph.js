const { ArrayUtils } = require("./utils");

class Graph {
  constructor(edges) {
    const nodes = ArrayUtils.uniq(ArrayUtils.flat(edges));
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
    const visiting = new Map(nodes.map((node) => [node, false]));
    let count = 0;
    for (const root of nodes) {
      const visited = visiting.get(root);
      if (visited) {
        continue;
      }
      count++;
      visiting.set(root, true);
      const search = [root];
      while (true) {
        if (search.length === 0) {
          break;
        }
        const parent = search.shift();
        const children = edgeMap.get(parent);
        for (const child of children) {
          const visited = visiting.get(child);
          if (!visited) {
            visiting.set(child, true);
            search.push(child);
          }
        }
      }
    }
    return count;
  }
}

module.exports = Graph;
