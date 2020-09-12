# lcom/lcom4

Ensures a value of so called [LCOM4](https://objectscriptquality.com/docs/metrics/lack-cohesion-methods-lcom4) to be less than 2 in a class.

## Rule Details

This rule aims to keep methods in a class high cohesive by using LCOM4 metric. It suggests that the class needs to be split into two or more classes if LCOM4 > 1.

Examples of **incorrect** code for this rule:

```js
// LCOM4 = 1
class A {
  foo() {
    return this.var1
  }

  bar() {
    return this.var1
  }
}
```

Examples of **correct** code for this rule:

```js
// LCOM4 = 2
class A {
  foo() {
    return this.var1
  }

  bar() {
    return this.var2
  }
}
```

## Further Reading

- [Lack of Cohesion in Methods (LCOM4) | objectscriptQuality](https://objectscriptquality.com/docs/metrics/lack-cohesion-methods-lcom4)
- [Project Metrics Help - Cohesion metrics](https://www.aivosto.com/project/help/pm-oo-cohesion.html)
- [Measuring Coupling and Cohesion In Object-Oriented Systems (pdf)](http://www.isys.uni-klu.ac.at/PDF/1995-0043-MHBM.pdf)
