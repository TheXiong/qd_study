import React from 'react'
import {Router,Route,Link} from '../react-router/index.js'

class A extends React.Component {
    render(){
        return (
            <div>a</div>
        )
    }
}
class B extends React.Component {
    render(){
        return (
            <div>b</div>
        )
    }
}
class C extends React.Component {
    render(){
        return (
            <div>c</div>
        )
    }
}

export default class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Link to="/a">a</Link>
                    <Link to="/b">b</Link>
                    <Link to="/c">c</Link>
                </div>
                <div>
                    <Route path="/a" component={A}/>
                    <Route path="/b" component={B}/>
                    <Route path="/c" component={C}/>
                </div>
            </Router>
        )
    }
}