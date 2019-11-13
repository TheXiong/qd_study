import React from 'react'
import PropTypes from 'prop-types';

export default class Router extends React.Component {

    static contextTypes = {
        location: PropTypes.object,
    }

    render() {
        let hashPath = this.context.location.hash.slice(1);
        let { component: Component, path } = this.props

        return hashPath===path?<Component />:null
    }
}