# eslint-plugin-lcom

![build status](https://github.com/fujiharuka/eslint-plugin-lcom/workflows/test/badge.svg)
![npm version](https://img.shields.io/npm/v/eslint-plugin-lcom.svg)

ESLint plugin to keep your JavaScript classes high cohesive by using LCOM (Lack of Cohesion of Methods) metric.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lcom`:

```
$ npm install eslint-plugin-lcom --save-dev
```


## Usage

Add `lcom` to the plugins section of your `.eslintrc` configuration file. Then configure the rules you want to use under the rules section.

```json
{
    "plugins": [
        "lcom"
    ],
    "rules": {
        "lcom/lcom4": "warn"
    }
}
```

## Supported Rules

We currently support the only one rule of [`lcom4`](./docs/rules/lcom4.md). It ensures a value of so called [LCOM4](https://objectscriptquality.com/docs/metrics/lack-cohesion-methods-lcom4) to be less than 2 in a class.
