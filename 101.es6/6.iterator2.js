let a = [1, 2, 3, 4]
console.log(a.entries()); //Object [Array Iterator] {}
let iterator = a.entries()
console.log(iterator.next()); //{ value: [ 0, 1 ], done: false }
console.log(iterator.next()); //{ value: [ 1, 2 ], done: false }
console.log(iterator.next()); //{ value: [ 2, 3 ], done: false }
console.log(iterator.next()); //{ value: [ 3, 4 ], done: false }
console.log(iterator.next()); //{ value: undefined, done: true }

console.log(a.keys()); //Object [Array Iterator] {}
console.log(a.values()); //Object [Array Iterator] {}

console.log(Object.entries(a)); //[ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ], [ '3', 4 ] ]
console.log(Object.keys(a)); //[ '0', '1', '2', '3' ]
console.log(Object.values(a)); //[ 1, 2, 3, 4 ]

//