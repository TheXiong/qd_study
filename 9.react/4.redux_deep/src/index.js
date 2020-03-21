import ReactDom from 'react-dom'
import React from 'react'
import Counter from './pages/counter'

class App extends React.Component {
    render(){
        return (
            <div>
                <Counter></Counter>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById("root"))