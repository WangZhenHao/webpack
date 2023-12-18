const { tokenizer, parser, transformer, codeGenrator } = require('./compiler.js')

const input = '(add 3 (substract 4 2))'
const tokens = tokenizer(input);
const ast = parser(tokens)
/**
 {
  "type": "program",
  "body": [
    {
      "type": "CallExpression",
      "name": "add",
      "params": [
        { "type": "NumberLiteral", "value": "3" },
        {
          "type": "CallExpression",
          "name": "substract",
          "params": [
            { "type": "NumberLiteral", "value": "4" },
            { "type": "NumberLiteral", "value": "2" }
          ]
        }
      ]
    }
  ]
}

 */

const newAst = transformer(ast)

const code = codeGenrator(newAst)
/**
 {
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStament",
      "expresion": {
        "type": "CallExpression",
        "callee": { "type": "Identifier", "name": "add" },
        "arguments": [
          { "type": "NumberLiteral", "value": "3" },
          {
            "type": "CallExpression",
            "callee": { "type": "Identifier", "name": "substract" },
            "arguments": [
              { "type": "NumberLiteral", "value": "4" },
              { "type": "NumberLiteral", "value": "2" }
            ]
          }
        ]
      }
    }
  ]
}

 */
console.log(code)
