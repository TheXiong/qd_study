import React from 'react'
import PropTypes from 'prop-types';

export default class Router extends React.Component {

    constructor() {
        super();
        this.state = {
            location: window.location
        }
    }
    static childContextTypes = {
        location: PropTypes.object,
        history: PropTypes.object
    }

    getChildContext() {
        return {
            location: this.state.location,
            history: {
                push:(path)=>{
                    window.location.hash = path
                }
            }
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ location: JSON.parse(JSON.stringify(window.location)) })
        })
    }

    render() {
        return this.props.children || null
    }
}