module.exports = class {
  constructor() {
    this.a = 1
  }

  static stat() {}

  foo() {
    return this
  }

  bar() {
    return this.bar
  }

  baz() {}
}
