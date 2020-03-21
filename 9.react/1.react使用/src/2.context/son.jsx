import React from 'react'
import MyContext from './myContext.js'

export default class Son extends React.Component {
    render() {
        return (
            <MyContext.Consumer>
                {
                    (context) => (
                        <>
                            <div>
                                {context.name}
                            </div>
                            <button onClick={() => context.changeUser(context.name == "lisi" ? "zhangsan" : "lisi")}>click me to change user</button>
                        </>
                    )
                }
            </MyContext.Consumer>

        )
    }
}