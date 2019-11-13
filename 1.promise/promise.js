function Promise(task) {
	this.status = 'pedding';
	this.value = undefined;
	this.fulfilledCallbacks = [];
	this.rejectedCallbacks = [];
	let that = this;

	function resolve(value) {
		if (that.status == 'pedding') {
			that.status = 'fulfilled'
			that.value = value;
			that.fulfilledCallbacks.forEach(callback => {
				callback();
			})
		}
	}

	function reject(reason) {
		if (that.status == 'pedding') {
			that.status = 'rejected'
			that.value = reason;
			that.rejectedCallbacks.forEach(callback => {
				callback();
			})
		}
	}

	task(resolve, reject);
}

Promise.prototype.then = function(fulfilledCall, rejectedCall) {
	let promiseNext;
	let that = this;
	if (that.status == 'fulfilled') {
		promiseNext = new Promise((resolve, reject) => {
			let x = fulfilledCall(that.value)
			// resolve(x)
			resolvePromise(promiseNext, x, resolve, reject)
		})
	}
	if (that.status == 'rejected') {
		promiseNext = new Promise((resolve, reject) => {
			let x = rejectedCall(that.value)
			// resolve(x)
			resolvePromise(promiseNext, x, resolve, reject)
		})
	}
	if (that.status == 'pedding') {

		promiseNext = new Promise((resolve, reject) => {

			fulfilledCall && that.fulfilledCallbacks.push(() => {
				let x = fulfilledCall(that.value);
				// resolve(x)
				resolvePromise(promiseNext, x, resolve, reject)
			});

			rejectedCall && that.rejectedCallbacks.push(() => {
				let x = rejectedCall(that.value);
				// resolve(x)
				resolvePromise(promiseNext, x, resolve, reject)
			});
		})

	}
	return promiseNext
}


Promise.all = function(promiseArr) {
	return new Promise((resolve, reject) => {
		let successCount = 0;
		let valueArr = new Array(promiseArr.length);
		let promiseNext;
		promiseArr.forEach((promise, index) => {
			promise.then(x => {
				successCount++;
				valueArr[index] = x;
				if (successCount == promiseArr.length) {
					resolve(valueArr)
				}
			}, reject)
		})
	})

}

Promise.race = function(promiseArr) {
	return new Promise((resolve, reject) => {
		let done = false;
		promiseArr.forEach((promise, index) => {
			promise.then(x => {
				if (!done) {
					resolve(x)
					done = true
				}
			}, err => {
				if (!done) {
					reject(err)
					done = true
				}
			})
		})
	})
}

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError("循环引用"))
	}
	if (x instanceof Promise) {
		if (x.status == 'pedding') {
			x.then(y => {
				resolvePromise(promise2, y, resolve, reject);
			}, reject)
		}
		if (x.status == 'fulfilled') {
			resolve(x.value)
		}
		if (x.status == 'rejected') {
			reject(x.value)
		}
	} else if (x != null && (typeof x == 'object' || typeof x == 'function')) {
		try {
			then = x.then;
			if (typeof then == 'function') {
				then.call(x, y => {
					resolvePromise(promise2, y, resolve, reject);
				}, reject)
			}
		} catch (e) {
			reject(e)
		}
	} else {
		resolve(x)
	}
}


module.exports = Promise
