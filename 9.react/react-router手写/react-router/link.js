import React from 'react'
import PropTypes from 'prop-types'

export default class Link extends React.Component {

    static contextTypes = {
        history: PropTypes.object,
    }

    redirect = () => {
        this.context.history.push(this.props.to);
    }

    render() {
        let { to, children } = this.props
        return (
            <a onClick={this.redirect}>{children}</a>
        )
    }
}