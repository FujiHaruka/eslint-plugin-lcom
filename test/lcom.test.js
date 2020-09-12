const rule = require("../lib/rules/lcom4");
const { RuleTester } = require("eslint");

const tester = new RuleTester();

const parserOptions = { ecmaVersion: 6 };

const valid = [
  { code: "class A { constructor() {} }", parserOptions },
  {
    code:
      "class A { sum() { return this.a + this.b } diff() { const {a, b} = this; return a - b } get aa() { return this.a } }",
    parserOptions,
  },
  {
    code:
      "class A { foo() {} bar() { this.foo() } }",
    parserOptions,
  },
  {
    code: "class A { constructor() {} static a() {} foo() {} }",
    parserOptions,
  },
  {
    code: "class A { foo() {} bar() { this.foo() } baz() { this.bar() } hoge() { this.baz() } }",
    parserOptions,
  },
  {
    code: "class A { foo() { this.a } bar() { this.b } baz() { this.a + this.b } }",
    parserOptions,
  }
]

const invalid = [
  {
    code: "class A { foo() {} bar() {} }",
    parserOptions,
    errors: [
      { type: "ClassDeclaration", messageId: "lcomOver", data: { lcom: 2 } },
    ],
  },
  {
    code: "class A { foo() {} bar() { this.foo() } baz() {} }",
    parserOptions,
    errors: [
      { type: "ClassDeclaration", messageId: "lcomOver", data: { lcom: 2 } }
    ]
  }
]

tester.run("lcom", rule, {
  valid,
  invalid,
});
