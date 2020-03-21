import { createStore , combineReducers , applyMiddleware } from "../redux/index"
import reducer from './reducer'
import Logger from './pages/redux-log'
import Thunk from './pages/redux-thunk'
let rootReducer = combineReducers({
    root:reducer
})
let store = createStore(rootReducer,applyMiddleware(Logger(),Thunk()))

export default store