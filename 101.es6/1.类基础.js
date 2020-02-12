/**
 * 关于new
 */

function Fn(name) {
    this.name = name
}

function _new() {
    // 1、创建一个新对象
    let target = {};
    let [constructor, ...args] = [...arguments];  // 第一个参数是构造函数
    // 2、原型链连接
    target.__proto__ = constructor.prototype;
    // 3、将构造函数的属性和方法添加到这个新的空对象上。
    let result = constructor.apply(target, args);
    if (result && (typeof result == "object" || typeof result == "function")) {
        // 如果构造函数返回的结果是一个对象，就返回这个对象
        return result
    }
    // 如果构造函数返回的不是一个对象，就返回创建的新对象。
    return target
}

var f = _new(Fn,'name')

/**
 * 关于继承
 */
function Parent() {
    this.name = 'parent'
}

function Child() { }

Child.prototype = new Parent()
//Child会继承Parent的私有属性
//还有第二步,重写constructor指向,Child.prototype没有constructor就会向上去找Parent.prototype的constructor
Child.prototype.constructor = Child