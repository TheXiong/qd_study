/**
 * map根对象相似
 * 1.对象里面键只能是字符串，而map的key可以是任意类型
 */

let m = new Map() //new Map([[key,value],[key,value]])
let a = { a: 2 }
let b = [1, 2]
//添加
m.set(a, 'a')
m.set(b, 'b')
console.log(m); //Map { { a: 2 } => 'a', [ 1, 2 ] => 'b' }
//获取
console.log(m.get(a)); //a
//遍历
console.log(m.entries()); //[Map Entries] { [ { a: 2 }, 'a' ], [ [ 1, 2 ], 'b' ] }
console.log(m.keys()); //[Map Iterator] { { a: 2 }, [ 1, 2 ] }
console.log(m.values()); //[Map Iterator] { 'a', 'b' }
m.forEach((item,index,map)=>{
    console.log(item,index,map);
})
for (const iterator of m) {
    console.log(iterator);
}
for (const key in m) {
    console.log(key);
}
//判断有没有
console.log(m.has(a)); //true
//删除
m.delete(a)
console.log(m); //Map { [ 1, 2 ] => 'b' }

/**
 * 1.WeakMap 的 key 只能是 Object 类型
 * 2.WeakMap 持有的是每个键对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行
 */