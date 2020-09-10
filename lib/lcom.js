const NodeTypes = {
  MemberExpression: "MemberExpression",
  VariableDeclarator: "VariableDeclarator"
}

const last = (arr) => arr[arr.length - 1]

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
      lcom: "Expected LCOM of class {{name}} to be 1, but was {{lcom}}"
    }
  },
  create(context) {
    const classStack = []

    const enterClass = (node) => {
      // push an empty method stack
      classStack.push([])
    }

    const exitClass = (node) => {
      const cls = classStack.pop()
      console.log('exit class', cls)
    }

    const enterMethod = (node) => {
      const methodStack = last(classStack)
      methodStack.push(new Set())
    }

    const exitMethod = (node) => {
      // const methodStack = classStack[classStack.length - 1].pop()
      // console.log('exit method', methodStack)
    }

    const appendUsedPropertiesInMethod = (node) => {
      if (classStack.length === 0) {
        return
      }
      const { parent } = node
      switch (parent.type) {
        case NodeTypes.MemberExpression: {
          const methodStack = last(classStack)
          last(methodStack).add(parent.property.name)
          return
        }
        case NodeTypes.VariableDeclarator: {
          if (parent.id.properties) {
            const names = parent.id.properties.map(({ key }) => key.name)
            const methodStack = last(classStack)
            names.forEach((name) => last(methodStack).add(name))
          }
          return
        }
        default:
          console.log(parent)
      }
    }

    return {
      ClassDeclaration: enterClass,
      'ClassDeclaration:exit': exitClass,
      ClassExpression: enterClass,
      'ClassExpression:exit': exitClass,
      MethodDefinition: enterMethod,
      'MethodDefinition:exit': exitMethod,
      ThisExpression: appendUsedPropertiesInMethod
    }
  }
}
