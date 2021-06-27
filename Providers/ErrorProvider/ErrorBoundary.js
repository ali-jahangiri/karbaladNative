import React from 'react';

import api from '../../api';
import client from '../../client';

import FallbackScreen from './FallbackScreen';

class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError : false }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError : true
        }
    }

    componentDidCatch(error , info) {
        // connect to error monitoring service
        
        // api.post("saveException" , {
        //     Message : `error message => ${error} --- component stack trace => ${info}`,
        //     version: client.version,
        //     reload: true
        // })
    }

    resetHandler() {
        this.setState({ hasError: false });
    }

    render() {
        if(this.state.hasError) {
            return (
                <FallbackScreen resetter={() => this.resetHandler()} />
            )
        }else return this.props.children
    }
}

export default ErrorBoundary;