const babel = require("@babel/core");
const types = require("@babel/types");
// const parser = require("@babel/parser");   acorn(以前是Babylon)
// const traverse = require("@babel/traverse");
// const generator = require("@babel/generator");
let prevCode = "async (a,b)=>{let c = a+b}"
//原AST
// {
//     "type": "Program",
//     "start": 0,
//     "end": 10,
//     "body": [
//       {
//         "type": "ExpressionStatement",
//         "start": 0,
//         "end": 10,
//         "expression": {
//           "type": "ArrowFunctionExpression",
//           "start": 0,
//           "end": 10,
//           "id": null,
//           "expression": true,
//           "generator": false,
//           "async": false,
//           "params": [
//             {
//               "type": "Identifier",
//               "start": 1,
//               "end": 2,
//               "name": "a"
//             },
//             {
//               "type": "Identifier",
//               "start": 3,
//               "end": 4,
//               "name": "b"
//             }
//           ],
//           "body": {
//             "type": "BinaryExpression",
//             "start": 7,
//             "end": 10,
//             "left": {
//               "type": "Identifier",
//               "start": 7,
//               "end": 8,
//               "name": "a"
//             },
//             "operator": "+",
//             "right": {
//               "type": "Identifier",
//               "start": 9,
//               "end": 10,
//               "name": "b"
//             }
//           }
//         }
//       }
//     ],
//     "sourceType": "module"
//   }

//目标AST
// {
//     "type": "Program",
//     "start": 0,
//     "end": 38,
//     "body": [
//       {
//         "type": "ExpressionStatement",
//         "start": 0,
//         "end": 38,
//         "expression": {
//           "type": "FunctionExpression",
//           "start": 1,
//           "end": 36,
//           "id": null,
//           "expression": false,
//           "generator": false,
//           "async": false,
//           "params": [
//             {
//               "type": "Identifier",
//               "start": 11,
//               "end": 12,
//               "name": "a"
//             },
//             {
//               "type": "Identifier",
//               "start": 14,
//               "end": 15,
//               "name": "b"
//             }
//           ],
//           "body": {
//             "type": "BlockStatement",
//             "start": 17,
//             "end": 36,
//             "body": [
//               {
//                 "type": "ReturnStatement",
//                 "start": 21,
//                 "end": 34,
//                 "argument": {
//                   "type": "BinaryExpression",
//                   "start": 28,
//                   "end": 33,
//                   "left": {
//                     "type": "Identifier",
//                     "start": 28,
//                     "end": 29,
//                     "name": "a"
//                   },
//                   "operator": "+",
//                   "right": {
//                     "type": "Identifier",
//                     "start": 32,
//                     "end": 33,
//                     "name": "b"
//                   }
//                 }
//               }
//             ]
//           }
//         }
//       }
//     ],
//     "sourceType": "module"
//   }
let result = babel.transformSync(prevCode, {
    plugins: [
        function () {
            return {
                visitor: {
                    ArrowFunctionExpression(path) {
                        let body = path.node.body;
                        if (body.type == 'BinaryExpression') {
                            let ReturnStatement = types.returnStatement(body)
                            body = types.blockStatement([ReturnStatement], [])
                        } else { //body.type == 'BlockStatement'
                            // console.log(body);
                        }
                        let FunctionExpression = types.functionExpression(path.node.id, path.node.params, body, path.node.generator, path.node.async)
                        path.replaceWith(FunctionExpression)
                    }
                }
            };
        }
    ]
});

console.log(result.code);
