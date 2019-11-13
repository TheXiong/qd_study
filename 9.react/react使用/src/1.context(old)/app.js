//App.js
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Son1 from './son1'

/**
 * context与redux
 * context只能从上往下（可父组件往孙传递），redux可以在所有组件互相传递
 * react-redux的provider是通过context实现的，用来向下传递store
 */

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.changeName = this.changeName.bind(this)
        this.state = {
            name: "zhangsan"
        }
    }

    getChildContext() {
        return {
            name: this.state.name,
            changeName: this.changeName
        };
    }

    changeName(newName){
        this.setState({name:newName})
    }

    render() {
        return (
            <>
                <Son1 />
            </>
        )
    }
};
App.childContextTypes = {
    // 需要传递的变量需要在这里定义，否则会报错
    name: PropTypes.string,
    changeName: PropTypes.func
}