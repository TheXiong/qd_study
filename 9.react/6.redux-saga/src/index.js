import "@babel/polyfill";
import ReactDom from 'react-dom'
import React from 'react'
import Counter from './pages/counter'
import {Provider} from 'react-redux'
import store from './store'

class App extends React.Component {
    render(){
        return (
            <Provider store={store}>
                <Counter></Counter>
            </Provider>
        )
    }
}

ReactDom.render(<App/>, document.getElementById("root"))