import {connect} from "react-redux";
import React, {Component} from 'react';

import LinearProgress from "./loaders/LinearProgress";
import {setRequestGlobalAction} from "../redux/actions/GeneralAction";

class RequestGlobalLoader extends Component {
    state = {
        loading: this.props.loading,
    };

    static getDerivedStateFromProps(props, state) {
        if (props.loading !== state.loading) {
            props.setRequestGlobalAction(props.loading);

            return {
                loading: props.loading
            }
        }
        return null;
    }

    render() {
        return (
            <div className={`global-loader justify-content-center`}>
                {this.props.requestGlobalLoader && <LinearProgress />}
                <div className={`${this.props.requestGlobalLoader ? 'global-loader-overlay' : ''}`} />
            </div>
        );
    }
}

const mapStateToProps = (
    {
        requestGlobalLoader,
        authUser,
    }
) => ({
    requestGlobalLoader,
    loading: authUser.loading
});

export default connect(mapStateToProps, {setRequestGlobalAction})(RequestGlobalLoader);
