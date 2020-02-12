class Parent {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}


class Child extends Parent {
    constructor(name, age) {
        super(name)
        this.age = age
    }
    getAge() {
        return this.age
    }
}


/**
 * ==============================================
 * es6继承编译成es5
 */


"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { 
    if (call && (_typeof(call) === "object" || typeof call === "function")) { 
        return call; 
    } 
    return _assertThisInitialized(self); 
}

function _assertThisInitialized(self) { 
    if (self === void 0) { 
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); 
    } 
    return self; 
}

function _getPrototypeOf(o) { 
    _getPrototypeOf = Object.setPrototypeOf ? 
        Object.getPrototypeOf : 
        function _getPrototypeOf(o) { 
            return o.__proto__ || Object.getPrototypeOf(o); 
        }; 
    return _getPrototypeOf(o); 
}

function _inherits(subClass, superClass) { 
    if (typeof superClass !== "function" && superClass !== null) { 
        throw new TypeError("Super expression must either be null or a function"); 
    } 
    //继承父类
    subClass.prototype = Object.create(superClass && superClass.prototype, { 
        constructor: { 
            value: subClass, 
            writable: true, 
            configurable: true 
        } //重写constructor，否则subClass实例的constructor会指向superClass
    }); 
    if (superClass) _setPrototypeOf(subClass, superClass); 
    //subClass.__proto__ = superClass
    //这一步是为了让子类继承父类的静态属性
}

function _setPrototypeOf(o, p) {
     _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { 
         o.__proto__ = p; 
         return o; 
    }; 
    return _setPrototypeOf(o, p); 
}

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Parent =
    /*#__PURE__*/
    function () {
        function Parent(name) {
            _classCallCheck(this, Parent);

            this.name = name;
        }

        _createClass(Parent, [{
            key: "getName",
            value: function getName() {
                return this.name;
            }
        }]);

        return Parent;
    }();

var Child =
    /*#__PURE__*/
    function (_Parent) {
        _inherits(Child, _Parent); //继承

        function Child(name, age) {
            var _this;

            _classCallCheck(this, Child); //检查是否通过new调用

            //继承的时候会把Child.__proto__ = Parent来继承静态属性
            //_getPrototypeOf(Child)是获取Child.__proto__
            _this = _possibleConstructorReturn(this, _getPrototypeOf(Child).call(this, name));
            _this.age = age;
            return _this;
        }

        _createClass(Child, [{
            key: "getAge",
            value: function getAge() {
                return this.age;
            }
        }]);

        return Child;
    }(Parent);