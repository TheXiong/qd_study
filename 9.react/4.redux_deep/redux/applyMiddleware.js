import compose from './compose.js'


function applyMiddleware(...middlewares) {
    return createStore => (reducer, preloadedState) => {
        //重写store.dispatch
        let store = createStore(reducer, preloadedState)
        let dispatch;
        let middlewareApi = {
            getState: store.getState,
            dispatch: action => dispatch(action)
        }
        let chain = middlewares.map(middleware => middleware(middlewareApi))
        console.log(chain[0],555);
        
        dispatch = compose(...chain)(store.dispatch)
        console.log(dispatch);
        
        return {
            ...store,
            dispatch
        }
    }
}


export default applyMiddleware