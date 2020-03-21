
function combineReducers(reducersMap){
    return (state,action)=>{
        state = state || {}
        for (const reducerKey in reducersMap) {
            state[reducerKey] = reducersMap[reducerKey](state[reducerKey],action)
        }
        return state
    }
}


export default combineReducers