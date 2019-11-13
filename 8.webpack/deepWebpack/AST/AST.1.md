使用esprima、estraverse、escodegen给函数更名
```javascript
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');
let code = 'function a(){}';
let ast = esprima.parse(code);
/**
 * 
{
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "a",
                "range": [
                    9,
                    10
                ]
            },
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [],
                "range": [
                    12,
                    14
                ]
            },
            "generator": false,
            "expression": false,
            "async": false,
            "range": [
                0,
                14
            ]
        }
    ],
    "sourceType": "module",
    "range": [
        0,
        14
    ]
}
 */

estraverse.traverse(ast, {
    enter: function (node) {
        if (node.type == 'Identifier') {
            node.name = 'b'
        }
    },
    // leave: function (node) {
    //     console.log(2);
    // }
})
let regenerated_code = escodegen.generate(ast)
console.log(regenerated_code); //function b() {}
```
