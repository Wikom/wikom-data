/**
 * Created by rouven on 15.03.17.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Loading from 'react-loading'

import {loadData, clearData} from '../actions'

/**
 * This is the main component.  It is responsible for loading the data into its children (passing it via props),also it handles the loading bar.
 * It is not responsible for loading the data into the state, nor is it responsiblefor updating the data in the state, although it might call the
 * loadData action responsible for loading data.
 */
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
            ? <span>{this.props.loading}</span>
            : <span>{this.props.children}</span>
    }
}

/**
 * accepts assoc objects and arrays, returns type of data
 * @param data
 * @param prependData
 * @param appendData
 */
const mergeData = (data, prependData = null, appendData = null) => {
    if (typeof data != "object" || typeof prependData != "object" || typeof appendData != "object")
        return data;

    if (Array.isArray(data)) {
        prependData = Array.isArray(prependData) ? prependData : [];
        appendData = Array.isArray(appendData) ? appendData : [];

        return prependData.concat(data, appendData);
    }

    return Object.assign({}, prependData, data, appendData);
};


/**
 *
 * @param Child
 * @param state
 * @param dataProp
 * @param isLoadingProp
 * @param name
 * @param dataMap
 * @param prependData
 * @param appendData
 * @param rest
 * @return {*}
 */
const mapChildren = function (Child, state, dataProp, isLoadingProp, name, dataMap, prependData, appendData, rest) {
    const storeData = state.data && state.data[name] || [];
    const isLoading = !state.queries[name] || state.queries[name].isPending === true;

    let data = (typeof dataMap == 'function' && storeData instanceof Array) ?
        storeData.map(dataMap) :
        storeData;
    data = mergeData(data, prependData, appendData);

    return React.cloneElement(Child, {
        [isLoadingProp]: isLoading,
        [dataProp]: isLoading ? null : data,
        pagination: state.data && state.data.pagination && state.data.pagination[name] || null,
        ...rest
    });
};

const mapStateToProps = (state, {children, name, url, force, dataProp, isLoadingProp, refresh, dataMap, prependData, appendData, ...rest}) => ({
    isLoading: !state.queries[name] || state.queries[name].isPending === true,
    refresh: refresh || (state.queries[name] && state.queries[name].isQueued === true),
    force: force || !state.queries[name] || state.queries[name].isComplete === false,
    children: React.Children.map(children, Child => mapChildren(Child, state, dataProp, isLoadingProp, name, dataMap, prependData, appendData, rest))
});

const mapDispatchToProps = dispatch => ({
    loadData: ({name, url}) => dispatch(loadData({name, url})),
    clearData: ({name}) => dispatch(clearData({name}))
});

const DataProviderContainer = connect(mapStateToProps, mapDispatchToProps)(DataProvider);

DataProviderContainer.defaultProps = {
    dataProp: 'data',
    isLoadingProp: 'isLoading',
    loading: (<Loading/>),
    force: false,
    refresh: false,
    onlyLoaded: false,
    dataMap: null
};

DataProviderContainer.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
    dataProp: PropTypes.string,
    isLoadingProp: PropTypes.string,
    force: PropTypes.bool,
    refresh: PropTypes.bool,
    onlyLoaded: PropTypes.bool,
    dataMap: PropTypes.func
};

export default DataProviderContainer;