
function createStore(reducer) {
    let currentState
    let subscribers = []

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