const { last } = require("../core/utils");
const Graph = require("../core/graph");

const NodeTypes = {
  MemberExpression: "MemberExpression",
  VariableDeclarator: "VariableDeclarator",
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      lcomOver: "Expected LCOM of class to be 0 or 1, but was {{lcom}}",
    },
  },
  create(context) {
    const classStack = [];

    const enterClass = () => {
      // push an empty method stack
      classStack.push([]);
    };

    const exitClass = (node) => {
      const methods = classStack.pop();
      const lcom = Graph.calcLCOM(methods);
      if (lcom > 1) {
        context.report({
          node,
          messageId: "lcomOver",
          data: {
            lcom,
          },
        });
      }
    };

    const enterMethod = (node) => {
      const methods = last(classStack);
      methods.push({
        name: node.key.name,
        skip: node.static || node.kind === "constructor",
        properties: new Set(),
      });
    };

    const appendUsedPropertiesInMethod = (node) => {
      if (classStack.length === 0) {
        return;
      }
      const { parent } = node;
      const methods = last(classStack);
      const method = last(methods);
      if (method.skip) {
        return
      }
      switch (parent.type) {
        case NodeTypes.MemberExpression: {
          method.properties.add(parent.property.name);
          return;
        }
        case NodeTypes.VariableDeclarator: {
          if (parent.id.properties) {
            const names = parent.id.properties.map(({ key }) => key.name);
            names.forEach((name) => method.properties.add(name));
          }
          return;
        }
        default:
          return
      }
    };

    return {
      ClassDeclaration: enterClass,
      "ClassDeclaration:exit": exitClass,
      ClassExpression: enterClass,
      "ClassExpression:exit": exitClass,
      MethodDefinition: enterMethod,
      ThisExpression: appendUsedPropertiesInMethod,
    };
  },
};
