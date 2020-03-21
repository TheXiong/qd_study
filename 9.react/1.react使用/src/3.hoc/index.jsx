import React from "react";
import wrapper from './wrapper'

class UserName extends React.Component {
    render() {
        return (
            <label>用户名<input value={this.props.data} onChange={this.props.handleChange} /></label>
        )
    }
}
//defaultValue只是第一次有用，使用defaultValue就是一个非受控组件
//使用value就是受控组件

class PassWord extends React.Component {
    render() {
        return (
            <label>密码<input value={this.props.data} onChange={this.props.handleChange} /></label>
        )
    }
}

/**
 * hoc(高阶组件)共用逻辑，react hooks的用处也是共用逻辑，他们之间的区别是什么
 */
export default class Hoc extends React.Component {
    
    render() {
        let SuperUserName = wrapper(UserName, "username")
        let SuperPassWord = wrapper(PassWord, "password")
        return (
            <form>
                <SuperUserName/>
                <SuperPassWord/>
            </form>
        )
    }
}