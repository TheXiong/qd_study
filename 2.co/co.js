module.exports = function co(gen){
	let it = gen();
	return new Promise((resolve,reject)=>{
		!function go(input){
			let {done,value} = it.next(input);
			if(value instanceof Promise){
				value.then(x=>{
					if(!done){
						go(x)
					}else{
						resolve(x)
					}
				},reject)
			}else{
				if(!done){
					go(value)
				}else{
					resolve(value)
				}
			}
		}()
	})
}
