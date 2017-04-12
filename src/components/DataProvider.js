/**
 * Created by rouven on 15.03.17.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Loading from 'react-loading'

import {loadData, clearData} from '../actions'

class DataProvider extends Component {

    componentDidMount() {
        if (this.props.force) {
            this._pendingFetch = this.props.loadData({name: this.props.name, url: this.props.url});
        }
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.force && this.props.url !== nextProps.url) || nextProps.refresh === true) {
            if (this._pendingFetch) {
                this._pendingFetch.cancel();
            }
            this.props.clearData({name: this.props.name});
            this._pendingFetch = this.props.loadData({name: nextProps.name, url: nextProps.url});
        }
    }

    componentWillUnmount() {
        this._pendingFetch && this._pendingFetch.cancel();
        if (this.props.force) {
            this.props.clearData({name: this.props.name});
        }
    }

    render() {
        return this.props.onlyLoaded && this.props.isLoading
            ? <Loading/>
            : <span>{this.props.children}</span>
    }

}

const mapStateToProps = (state, {children, name, url, force, dataProp, isLoadingProp, refresh, ...rest}) => ({
    isLoading: !state.queries[name] || state.queries[name].isPending === true,
    refresh: refresh || (state.queries[name] && state.queries[name].isQueued === true),
    force: force || !state.queries[name] || state.queries[name].isComplete === false,
    children: React.Children.map(children, Child => React.cloneElement(Child, {
        [isLoadingProp]: !state.queries[name] || state.queries[name].isPending === true,
        [dataProp]: state.data && state.data[name] || null,
        pagination: state.data && state.data.pagination && state.data.pagination[name] || null,
        ...rest
    }))
});

const mapDispatchToProps = dispatch => ({
    loadData: ({name, url}) => dispatch(loadData({name, url})),
    clearData: ({name}) => dispatch(clearData({name}))
});

const DataProviderContainer = connect(mapStateToProps, mapDispatchToProps)(DataProvider);

DataProviderContainer.defaultProps = {
    dataProp: 'data',
    isLoadingProp: 'isLoading',
    force: false,
    refresh: false,
    onlyLoaded: false
};

DataProviderContainer.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    dataProp: PropTypes.string,
    isLoadingProp: PropTypes.string,
    force: PropTypes.bool,
    refresh: PropTypes.bool,
    onlyLoaded: PropTypes.bool
};

export default DataProviderContainer;