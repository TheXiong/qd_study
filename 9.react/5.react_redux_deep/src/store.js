import { createStore , combineReducers } from "../redux/index"
import reducer from './reducer'
let rootReducer = combineReducers({
    root:reducer
})
let store = createStore(rootReducer)

export default store