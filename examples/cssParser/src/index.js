const css = require('css')

/**
 {
  "type": "stylesheet",
  "stylesheet": {
    "rules": [
      {
        "type": "rule",
        "selectors": [
          "#root"
        ],
        "declarations": [
          {
            "type": "declaration",
            "property": "width",
            "value": "100px",
            "position": {
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 2,
                "column": 14
              }
            }
          },
          {
            "type": "declaration",
            "property": "height",
            "value": "100px",
            "position": {
              "start": {
                "line": 3,
                "column": 2
              },
              "end": {
                "line": 3,
                "column": 15
              }
            }
          }
        ],
        "position": {
          "start": {
            "line": 1,
            "column": 1
          },
          "end": {
            "line": 4,
            "column": 2
          }
        }
      }
    ],
    "parsingErrors": []
  }
}
 */
class Px2rem {
	constructor(config) {
		this.config = config
	}

	generateRem(cssText) {
		let self = this;
		var astObject = css.parse(cssText)
		function processRules(rules) {
			for(let i = 0; i < rules.length; i++) {
        let declarations = rules[i].declarations;

        declarations.forEach(item => {
          if(item.type === 'declaration') {
            item.value = '1rem'
          }
        })


      }
		}
		processRules(astObject.stylesheet.rules)
		// console.log(JSON.stringify(astObject, null, 2))

		return css.stringify(astObject)
	}
}
var a = new Px2rem();

var b = a.generateRem(`#root {
	width: 100px;
	height: 100px;
}`)
console.log(b)
module.exports = Px2rem;
