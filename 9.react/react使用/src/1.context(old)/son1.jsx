//son1.js
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Son1 extends React.Component {
    
    render() {
        return (
            <>
                <button onClick={()=>this.context.changeName(this.context.name=="zhangsan"?"lisi":"zhangsan")}>改变名字</button>
                <div>{this.context.name}</div>
            </>
        )
    }
};

Son1.contextTypes = {
    name: PropTypes.string,
    changeName: PropTypes.func
}