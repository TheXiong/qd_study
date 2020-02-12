class Parent {
    constructor(name) {
        this.name = name
    }
    static a = 1
    static c() {

    }
    getName() {
        return this.name
    }
}
/**
 * ==================================================================
 * babel编译成es5的代码
 */


"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps); //原型属性
    if (staticProps) _defineProperties(Constructor, staticProps); //静态属性
    return Constructor;
}

var Parent =
    /*#__PURE__*/
    function () {
        function Parent(name) {
            //检查是否通过new调用
            _classCallCheck(this, Parent);

            this.name = name;
        }

        _createClass(Parent, [{
            key: "getName",
            value: function getName() {
                return this.name;
            }
        }], [{
            key: "c",
            value: function c() { }
        }]);

        return Parent;
    }();

_defineProperty(Parent, "a", 1);