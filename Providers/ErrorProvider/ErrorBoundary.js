import axios from 'axios';
import React from 'react';

import api from '../../api';
import client from '../../client';
import config from '../../config';
import { persister } from '../../utils';

import FallbackScreen from './FallbackScreen';

class ErrorBoundary extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError : false , message : "" , trace : ""}
    }

    static getDerivedStateFromError(error) {
        return {
            hasError : true
        }
    }

    componentDidCatch(error , info) {
        console.log(error.message , info);
        // connect to error monitoring service
        this.setState({ message: error.message , trace : info.componentStack });
        const caller = axios.create({
            url : `${config.serverPath}/MobileApi/saveException`,
            method : "POST"
        });
        
        persister.get("userPrivateKey")
            .then(data => {
                caller({
                    Message : `error message => ${error} --- component stack trace => ${info}`,
                    version: client.version,
                    isLogin : data || false,
                    reload: true
                })
               
            }).catch(err => {
                caller({
                    Message : `error message => ${error} --- component stack trace => ${info}`,
                    version: client.version,
                    isLogin : null,
                    cannotReachTOSecureStore : err,
                    reload: true
                })
            })
    }

    resetHandler() {
        this.setState({ hasError: false , message : "" });
    }

    render() {
        if(this.state.hasError) {
            return (
                <FallbackScreen trace={this.state.trace} errMessage={this.state.message} resetter={() => this.resetHandler()} />
            )
        }else return this.props.children
    }
}

export default ErrorBoundary;