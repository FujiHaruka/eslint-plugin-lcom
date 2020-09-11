const NodeTypes = {
  MemberExpression: "MemberExpression",
  VariableDeclarator: "VariableDeclarator",
};

const last = (arr) => arr[arr.length - 1];

const calcLCOM = (methods) => {
  for (const { name, properties } of methods) {
    // TODO
  }
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      // description: "enforce that class methods utilize `this`",
      // category: "Best Practices",
      // recommended: false,
      // url: "https://eslint.org/docs/rules/class-methods-use-this"
    },
    messages: {
      lcomOver: "Expected LCOM of class to be 1, but was {{lcom}}",
    },
  },
  create(context) {
    const classStack = [];

    const enterClass = (node) => {
      // push an empty method stack
      classStack.push([]);
    };

    const exitClass = (node) => {
      const cls = classStack.pop();
      console.log("exit class", cls);
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
          console.log(parent);
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
