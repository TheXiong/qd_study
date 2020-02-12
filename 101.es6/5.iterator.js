let a = [1, 2, 3, 4]
console.log(a[Symbol.iterator]); //[Function: values]
let iterator = a[Symbol.iterator]() //调用生成迭代器
console.log(iterator); //Object [Array Iterator] {}
console.log(iterator.next()); //{ value: 1, done: false }
console.log(iterator.next()); //{ value: 2, done: false }
console.log(iterator.next()); //{ value: 3, done: false }
console.log(iterator.next()); //{ value: 4, done: false }
console.log(iterator.next()); //{ value: undefined, done: true }

//Symbol.unscopables 指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。
console.log(a[Symbol.unscopables]);
a.aaaa = 1;
a[Symbol.unscopables]['aaaa'] = false
console.log(a[Symbol.unscopables]);
with (a) {
    console.log(length); //4
    console.log(aaaa); //1
}

a[Symbol.unscopables]['aaaa'] = true
console.log(a[Symbol.unscopables]);
with (a) {
    console.log(length); //4
    //console.log(aaaa); //aaaa is not defined
}