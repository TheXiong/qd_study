/**
 * set与数组类似，都是set不能有重复元素
 */
//创建
let s = new Set([1,2])
console.log(s); //Set { 1, 2 }
//添加
s.add(4)
s.add('4')
console.log(s); //Set { 1, 2, 4, '4' }
//删除
s.delete(1) //s.clear() 清空
console.log(s); //Set { 2, 4, '4' }
//获取
//可以迭代
console.log(s.entries()); //[Set Entries] { [ 2, 2 ], [ 4, 4 ], [ '4', '4' ] }
console.log(s.keys()); //[Set Iterator] { 2, 4, '4' } 
console.log(s.values()); //[Set Iterator] { 2, 4, '4' }

//判断里面有没有
console.log(s.has(4)); //true

for (const iterator of s) {
    console.log(iterator);
}
s.forEach((item,index,set)=>{
    console.log(item,index,set);
})
/**
 * 1.weakset有限制，weakset只能放对象到里面
 * 2.weakset不能迭代，for of、foreach、entries、keys、values不能使用
 * 3.weakset不能调用clear方法，当weakset里面对象设置为null时，weakset会自动清理该项
 *   所以，weakset可以用来检查内存泄漏
 */
let a = {q:1}
let b = {w:2}
let ws = new WeakSet([a,b])
console.log(ws.has(a),ws.has(b)); //true,true
a = null
console.log(ws.has(a),ws.has(b)); //false,true
