let Promise = require('./promise');

// let p1 = new Promise((resolve,reject)=>{
// 	setTimeout(()=>{
// 		let num = Math.random();
// 		if (num>.5) {
// 			resolve("成功："+num)
// 		}else{
// 			reject("失败："+num)
// 		}
// 	},2000)
// })


// let p2 = p1.then(data=>{

// 	console.log(data,111111);
// 	return new Promise((resolve,reject)=>{
// 		setTimeout(()=>{
// 			resolve(200)
// 		},2000)
// 	})
// 	// return 100
// },err=>{
// 	console.log(err);
// }).then(data=>{
// 	console.log(data,2222222);
// },err=>{
// 	console.log(err);
// })


let p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(10)
	}, 2000)
})
let p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(20)
		
	}, 1000)
})
let p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(30)
	}, 3000)
})
Promise.race([p1, p2, p3]).then(res => {
	console.log(res)
}, err => {
	console.log(err);
})
