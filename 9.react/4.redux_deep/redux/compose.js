function compose(...fns) {
    if (fns.length === 0) {
        return args=>args
    }
    return (...args) => {
        let last = fns.pop()
        return fns.reduceRight((composed, fn) => {
            return fn(composed)
        }, last(...args))
    }
}



export default compose