import React from 'react'
import Son from './son.jsx'
import MyContext from './myContext.js'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "zhangsan"
        }
    }
    changeUser(name) {
        this.setState({ name })
    }

    render() {
        return (
            <MyContext.Provider value={{ name:this.state.name, changeUser: this.changeUser.bind(this) }}>
                <Son />
            </MyContext.Provider>
        )
    }
}