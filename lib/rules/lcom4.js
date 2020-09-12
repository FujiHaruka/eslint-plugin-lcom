const { last } = require("../core/utils");
const Graph = require("../core/graph");

const NodeTypes = {
  MemberExpression: "MemberExpression",
  VariableDeclarator: "VariableDeclarator",
};

const NodeKinds = {
  CONSTRUCTOR: "constructor",
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    schema: [],
    messages: {
      lcomOver:
        "LCOM value of a class is expected to be less than 2, but was {{lcom}}. You can consider refactoring the class to split two or more clasees to keep the class high cohesive.",
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
        skip: node.static || node.kind === NodeKinds.CONSTRUCTOR,
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
        return;
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
          return;
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
