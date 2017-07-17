/**
 * Created by rouven on 15.03.17.
 */

import request from 'superagent'
import findInObject from 'find-in-object'
import {saveAs} from 'file-saver'
import * as types from './actionTypes'

export const setUser = ({user}) => ({
    type: types.SET_USER,
    user
});

/**
 * new API
 */

const requestHeaders = {};

export const configureRequest = () => (dispatch, getState) => {
    const token = findInObject('user.access_token', getState());

    if (token) {
        requestHeaders.Accept = 'application/json';
        requestHeaders.Authorization = 'Bearer ' + token;
    }
};

export const baseRequest = ({method = 'GET', url}) => request(method, url).set(requestHeaders);

export const get = ({url}) => baseRequest({url});

export const post = ({url, data}) => baseRequest({method: 'POST', url}).send(data);

export const put = ({url, data}) => baseRequest({method: 'PUT', url}).send(data);

export const del = ({url}) => baseRequest({method: 'DELETE', url});

export {types};

export const loadDataPending = ({name, url}) => ({
    type: types.LOAD_DATA_PENDING,
    name,
    url
});

export const loadDataSuccess = ({name, url, data}) => ({
    type: types.LOAD_DATA_SUCCESS,
    name,
    url,
    data
});

export const loadDataFailure = ({name, url, error}) => ({
    type: types.LOAD_DATA_FAILURE,
    name,
    url,
    error
});

export const loadDataCancel = ({name, url}) => ({
    type: types.LOAD_DATA_CANCEL,
    name,
    url
});

export const loadDataProgress = ({name, url, percent}) => ({
    type: types.LOAD_DATA_PROGRESS,
    name,
    url,
    percent
});

export const clearData = ({name}) => ({
    type: types.CLEAR_DATA,
    name
});

export const refreshData = ({name}) => ({
    type: types.REFRESH_DATA,
    name
});

export const setPagination = ({name, data}) => ({
    type: types.SET_PAGINATION,
    name,
    data
});

export const clearPagination = ({name}) => ({
    type: types.CLEAR_PAGINATION,
    name
});

export const loadData = ({name, url}) => (dispatch, getState) => {
    if (getState().queries.pending && getState().queries.pending.indexOf(url) !== -1) {
        return;
    }

    dispatch(loadDataPending({name, url}));

    const req = get({url});
    const promise = req
        .on('progress', event => {
            /* the event is:
             {
             direction: "upload" or "download"
             percent: 0 to 100 // may be missing if file size is unknown
             total: // total file size, may be missing
             loaded: // bytes downloaded or uploaded so far
             } */
            dispatch(loadDataProgress({name, url, percent: event.percent || 100}));
        })
        .then(response => {

            promise.cancel = () => {
                console.log('promise resolved - cancel disabled...')
            };

            if (response.ok && response.body) {
                dispatch(loadDataSuccess({name, url, data: response.body.data}));

                if (response.header['x-pagination-current-page']) {
                    const pagination = {
                        currentPage: Number(response.header['x-pagination-current-page']),
                        pageCount: Number(response.header['x-pagination-page-count']),
                        perPage: Number(response.header['x-pagination-per-page']),
                        totalCount: Number(response.header['x-pagination-total-count'])
                    };
                    dispatch(setPagination({name, data: pagination}));
                }
            }
        }).catch(error => {
            dispatch(loadDataFailure({name, url, error}));
            dispatch(clearPagination({name}));
        });

    promise.cancel = () => {
        req.abort();
        dispatch(loadDataCancel({name, url}));
    };

    return promise;
};

export const download = ({name, url}) => dispatch => {
    dispatch(loadDataPending({name, url}));

    const getFilename = (header) => {
        const disposition = header['content-disposition'];

        if (disposition && disposition.indexOf('attachment') !== -1) {
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            if (matches && matches[1]) {
                return matches[1].replace(/['"]/g, '');
            }
        }

        return null;
    };

    const req = get({url});
    const promise = req
        .responseType('blob')
        .on('progress', event => {
            /* the event is:
             {
             direction: "upload" or "download"
             percent: 0 to 100 // may be missing if file size is unknown
             total: // total file size, may be missing
             loaded: // bytes downloaded or uploaded so far
             } */
            dispatch(loadDataProgress({name, url, percent: event.percent || 100}));
        })
        .then(response => {

            promise.cancel = () => {
                console.log('promise resolved - cancel disabled...')
            };

            if (response.ok && response.body) {
                const filename = getFilename(response.header) || name;

                saveAs(response.body, filename);
                dispatch(loadDataSuccess({name, url, data: null}));
            }
        }).catch(error => {
            dispatch(loadDataFailure({name, url, error}));
        });

    promise.cancel = () => {
        req.abort();
        dispatch(loadDataCancel({name, url}));
    };

    return promise;
};

export const submit = ({url, data = {}, primaryKey = 'id'}) => () => {
    const req = (data.hasOwnProperty(primaryKey))
        ? put({url: url + '/' + findInObject(primaryKey, data), data})
        : post({url, data});

    const promise = req;

    promise.cancel = () => req.abort();

    return promise;
};

const executeDelete = ({url}) => () => {
    const req = del({url});
    const promise = req;

    promise.cancel = () => req.abort();

    return promise;
};

export const directDelete = ({url, refresh = null}) => dispatch =>
    dispatch(executeDelete({url}))
        .then(result => refresh !== null ? dispatch(refreshData({name: refresh})) : Promise.resolve('success'))
        .catch(error => Promise.reject('errored'));

export const confirmAndDelete =
    ({url, refresh = null, message = 'Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?'}) =>
        dispatch => (confirm(message)) ? dispatch(directDelete({url, refresh})) : Promise.resolve('canceled');
