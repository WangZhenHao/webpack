function tokenizer(input) {
	let current = 0;
	let tokens = [];

	while (current < input.length) {
		let char = input[current];

		if (char === "(") {
			tokens.push({
				type: "paren",
				value: "("
			});
			current++;
			continue;
		}

		if (char === ")") {
			tokens.push({
				type: "paren",
				value: ")"
			});
			current++;
			continue;
		}

		let WHITSPACE = /\s/;
		if (WHITSPACE.test(char)) {
			current++;
			continue;
		}

		let NUMBERS = /[0-9]/;
		if (NUMBERS.test(char)) {
			let val = "";
			while (NUMBERS.test(char)) {
				val += char;
				char = input[++current];
			}

			tokens.push({
				type: "number",
				value: val
			});
			continue;
		}

		if (char === "") {
			let val = "";
			char = input[++current];

			while (char !== "") {
				val += char;
				char = input[++current];
			}

			char = input[++current];

			tokens.push({
				type: "string",
				value: val
			});

			continue;
		}

		let LETTERS = /[a-z]/;
		if (LETTERS.test(char)) {
			let val = "";
			while (LETTERS.test(char)) {
				val += char;
				char = input[++current];
			}

			tokens.push({
				type: "name",
				value: val
			});
			continue;
		}

		// throw new TypeError('没有指定类型', char)
		return Error("没有指定类型:" + char + "索引：" + current);
	}

	return tokens;
}

// 语法分析 ast

function parser(tokens) {
	let current = 0;

	function walk() {
		let token = tokens[current];

		if (token.type === "number") {
			current++;
			return {
				type: "NumberLiteral",
				value: token.value
			};
		}

		if (token.type === "string") {
			current++;
			return {
				type: "StringLiteral",
				value: token.value
			};
		}

		if (token.type === "paren" && token.value === "(") {
			token = tokens[++current];

			let node = {
				type: "CallExpression",
				name: token.value,
				params: []
			};

			token = tokens[++current];

			while (
				token.type !== "paren" ||
				(token.type === "paren" && token.value !== ")")
			) {
				node.params.push(walk());
				token = tokens[current];
			}

			current++

			return node
		}

		throw new TypeError('类型报错')
	}

	let ast = {
		type: 'Program',
		body: []
	}

	while(current < tokens.length) {
		ast.body.push(walk())
	}

	return ast
}

function traverser(ast, visitor) {
	function traverseArray(array, parent) {
		array.forEach(child => {
			traverseNode(child, parent)
		})
	}

	function traverseNode(node, parent) {
		let methods = visitor[node.type];


		if(methods && methods.enter) {
			methods.enter(node, parent)
		}

		switch(node.type) {
			case 'Program':
			 traverseArray(node.body, node);
		  break;
			case 'CallExpression':
			  traverseArray(node.params, node)
			break;

			case 'NumberLiteral':
		  case 'StringLiteral':
			break;
			default:
			throw new TypeError('类型报错' + node)
		}
	}

	traverseNode(ast, null)
}

function transformer(ast) {
	let newAst = {
		type: 'Program',
		body: []
	}

	ast.__context = newAst.body;

	traverser(ast, {
		NumberLiteral: {
			enter(node, parent) {
				parent.__context.push({
					type: 'NumberLiteral',
					value: node.value
				})
			}
		},
		StringLiteral: {
			enter(node, parent) {
				parent.__context.push({
					type: 'StringLiteral',
					value: node.value
				})
			}
		},
		CallExpression: {
			enter(node, parent) {
				let expresion = {
					type: 'CallExpression',
					callee: {
						type: 'Identifier',
						name: node.name
					},
					arguments: []
				}

				node.__context = expresion.arguments

				if(parent.type !== 'CallExpression') {
					expresion = {
						type: 'ExpressionStament',
						expresion: expresion
					}
				}

				parent.__context.push(expresion)
			}
		}
	})

	return newAst;
}

function codeGenrator(node) {
	switch(node.type) {
		case 'Program':
			return node.body.map(codeGenrator).join('\n')
		case 'ExpressionStament':
			return codeGenrator(node.expresion) + ';'
		case 'CallExpression':
			return codeGenrator(node.callee) + '(' + node.arguments.map(codeGenrator).join(',') +')'
		case 'Identifier':
			return node.name;
		case 'NumberLiteral':
			return node.value;
		case 'StringLiteral':
			return node.value
	}
}

module.exports = {
	tokenizer,
	parser,
	transformer,
	codeGenrator
};
