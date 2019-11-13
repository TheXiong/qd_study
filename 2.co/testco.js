let co = require('./co')

function *go(){
	let a = 1;
	let b = yield new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve(122)
		},2000)
	});
	console.log(b);
	let c = yield b;
	console.log(c);
	let d = yield c;
	console.log(d);
	return d
}

co(go).then(res=>{
	console.log(res);
})