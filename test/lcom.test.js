const rule = require('../lib/lcom')
const { RuleTester } = require('eslint')

const tester = new RuleTester()

const parserOptions = { ecmaVersion: 6 }

tester.run("lcom", rule, {
  valid: [
    // { code: "class A { constructor() {} }", parserOptions },
    { code: "class A { sum() { return this.a + this.b } diff() { const {a, b} = this; return a - b } }", parserOptions },
    // { code: "class A { sum() { const s = this; return s } }", parserOptions },
  ],
  invalid: [
  //   {
  //     code: "class A { foo() {} }",
  //     parserOptions: { ecmaVersion: 6 },
  //     errors: [
  //         { type: "FunctionExpression", line: 1, column: 14, messageId: "missingThis", data: { name: "method 'foo'" } }
  //     ]
  // },
  ]
})
