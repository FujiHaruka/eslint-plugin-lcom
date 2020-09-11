const rule = require("../lib/lcom");
const { RuleTester } = require("eslint");

const tester = new RuleTester();

const parserOptions = { ecmaVersion: 6 };

tester.run("lcom", rule, {
  valid: [
    { code: "class A { constructor() {} }", parserOptions },
    {
      code:
        "class A { sum() { return this.a + this.b } diff() { const {a, b} = this; return a - b } get aa() { return this.a } }",
      parserOptions,
    },
    {
      code:
        "class A { aa() { const {a: b = 1 } = this; return b } bb() { this.aa() } }",
      parserOptions,
    },
  ],
  invalid: [
    //   {
    //     code: "class A { foo() {} }",
    //     parserOptions: { ecmaVersion: 6 },
    //     errors: [
    //         { type: "FunctionExpression", line: 1, column: 14, messageId: "missingThis", data: { name: "method 'foo'" } }
    //     ]
    // },
  ],
});
