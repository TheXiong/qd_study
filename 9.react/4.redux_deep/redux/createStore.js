
function createStore(reducer,preloadedState,enhancer) {
    let currentState
    let subscribers = []

    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState
        preloadedState = undefined
    }
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        return enhancer(createStore)(reducer, preloadedState)
    }

    function dispatch(action){
        currentState = {...currentState,...reducer(currentState,action)}
        subscribers.forEach(fn=>fn())
        return action
    }
    function getState(){
        return currentState
    }
    function unsubscribe(fn){
        subscribers = subscribers.filter(i=>{
            return i !== fn
        })
    }
    function subscribe(fn){
        subscribers.push(fn)
        return ()=>unsubscribe(fn)
    }

    dispatch({type:"init"})
    return {
        getState,
        dispatch,
        subscribe
    }
}




export default createStore