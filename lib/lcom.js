const { last } = require("./utils");
const Graph = require("./graph");

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

    const enterClass = (node) => {
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
      if (node.static) {
        return;
      }
      const methods = last(classStack);
      methods.push({
        name: node.key.name,
        properties: new Set(),
      });
    };

    const appendUsedPropertiesInMethod = (node) => {
      if (classStack.length === 0) {
        return;
      }
      const { parent } = node;
      switch (parent.type) {
        case NodeTypes.MemberExpression: {
          const methods = last(classStack);
          const method = last(methods);
          method.properties.add(parent.property.name);
          return;
        }
        case NodeTypes.VariableDeclarator: {
          if (parent.id.properties) {
            const names = parent.id.properties.map(({ key }) => key.name);
            const methods = last(classStack);
            const method = last(methods);
            names.forEach((name) => method.properties.add(name));
          }
          return;
        }
        default:
          console.error("???", parent);
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
