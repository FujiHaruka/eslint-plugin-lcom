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
}

module.exports = Graph;
