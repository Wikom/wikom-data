/**
 * Created by rouven on 15.03.17.
 */

/**
 * @module
 */
/**
 * @overview The functions described in this section all take only one object as parameter. The parameters described in the following are the keys of this object.
 */

import request from 'superagent'
import findInObject from 'find-in-object'
import {saveAs} from 'file-saver'
import * as types from './actionTypes'
/**
 * Action to dispatch if the app user should change
 * @param user {object} the new user
 */
export const setUser = ({user}) => ({
    type: types.SET_USER,
    user
});

/**
 * new API
 */

/**
 * @private
 * @type {{}}
 */
const requestHeaders = {};

/**
 * @private
 */
export const configureRequest = () => (dispatch, getState) => {
    const token = findInObject('user.access_token', getState());

    if (token) {
        requestHeaders.Accept = 'application/json';
        requestHeaders.Authorization = 'Bearer ' + token;
    }
};

/**
 * @private
 * @param method
 * @param url
 */
export const baseRequest = ({method = 'GET', url}) => request(method, url).set(requestHeaders);

/**
 * @private
 * @param url
 */
export const get = ({url}) => baseRequest({url});

/**
 * @private
 * @param url
 * @param data
 */
export const post = ({url, data}) => baseRequest({method: 'POST', url}).send(data);

/**
 * @private
 * @param url
 * @param data
 */
export const put = ({url, data}) => baseRequest({method: 'PUT', url}).send(data);

/**
 * @private
 * @param url
 */
export const del = ({url}) => baseRequest({method: 'DELETE', url});

/**
 * @private
 */
export {types};

/**
 * Action to dispatch as soon as an ajax request has started and is not finished
 * @param name {string} The name of the request (to determine where to store in store)
 * @param url {string} The url for the request
 */
export const loadDataPending = ({name, url}) => ({
    type: types.LOAD_DATA_PENDING,
    name,
    url
});

/**
 * Action to dispatch as soon as an api request finishes successfully
 * @param name {string} The name of the request (to determine where to store in store)
 * @param url {string} The url for the request
 * @param data {object} The data that was returned by the server
 */
export const loadDataSuccess = ({name, url, data}) => ({
    type: types.LOAD_DATA_SUCCESS,
    name,
    url,
    data
});
/**
 * Action to dispatch as soon as an api request failes on serverside
 * @param name {string} The name of the request (to determine where to store in store)
 * @param url {string} The url for the request
 * @param error {string} The error that was returned by the server
 */
export const loadDataFailure = ({name, url, error}) => ({
    type: types.LOAD_DATA_FAILURE,
    name,
    url,
    error
});
/**
 * Action to dispatch as soon as an api request fails on clientside
 * @param name {string} The name of the request
 * @param url {string} The url of the request
 */
export const loadDataCancel = ({name, url}) => ({
    type: types.LOAD_DATA_CANCEL,
    name,
    url
});
/**
 * Action to dispatch on progress message from server
 * @param name {string} The name of the request
 * @param url {string} the url of the request
 * @param percent {float} the percentage of completion
 */
export const loadDataProgress = ({name, url, percent}) => ({
    type: types.LOAD_DATA_PROGRESS,
    name,
    url,
    percent
});
/**
 * Action to dispatch if the "name" part of the store is to be cleared
 * @param name {string} the name of the part of the store that is to be cleared
 */
export const clearData = ({name}) => ({
    type: types.CLEAR_DATA,
    name
});
/**
 * Action to dispatch if the "name" part of the store is to be refreshed
 * @param name {string} the name of the part of the store that is to be refreshed
 */
export const refreshData = ({name}) => ({
    type: types.REFRESH_DATA,
    name
});
/**
 * Action to dispatch if the next request with "name" is to be paginated (or change in pagination)
 * @param name {string} the name of the request
 * @param data {object} the configuration of the pagination
 * @example
 {
  pagination{
     "tasks": {
       "currentPage": 1,
       "pageCount": 0,
       "perPage": 20,
       "totalCount": 0
     }
   }
 }
 */
export const setPagination = ({name, data}) => ({
    type: types.SET_PAGINATION,
    name,
    data
});
/**
 * Action to dispatch if the "next request with name"s pagination should be cleared
 * @param name {string} the name of the request
 */
export const clearPagination = ({name}) => ({
    type: types.CLEAR_PAGINATION,
    name
});

/**
 * Action to dispatch to load data from an url into the store
 * @param name {string} the name where to store the data
 * @param url {string} the url to send the request
 * @return {Promise}
 */
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
/**
 * Action to start a file download with progress information
 * @param name {string} the name of the request
 * @param url {string} the url of the file to download
 * @return {Promise}
 */
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
/**
 * Action to submit data to an endpoint. Sends a put or post request depending on wether the datas primaryKey attribute is set or not.
 * @param url {string} the url to submit to
 * @param data {object} the data to submit
 * @param primaryKey {string} the primaryKey attributes name in the data, defaults to id
 * @return {Promise}
 */
export const submit = ({url, data = {}, primaryKey = 'id'}) => () => {
    const req = (data.hasOwnProperty(primaryKey))
        ? put({url: url + '/' + findInObject(primaryKey, data), data})
        : post({url, data});

    const promise = req;

    promise.cancel = () => req.abort();

    return promise;
};
/**
 * Sends an delete request to a server
 * @param url {string} the url to send the request to
 * @return {Promise}
 */
const executeDelete = ({url}) => () => {
    const req = del({url});
    const promise = req;

    promise.cancel = () => req.abort();

    return promise;
};
/**
 * Sends a direct delete request to an endpoint
 * @param url {string} the url to send the delete to
 * @param refresh {string} the name of the part of the store that should be refreshed afterwards
 * @return {Promise}
 */
export const directDelete = ({url, refresh = null}) => dispatch =>
    dispatch(executeDelete({url}))
        .then(result => refresh !== null ? dispatch(refreshData({name: refresh})) : Promise.resolve('success'))
        .catch(error => Promise.reject('errored'));

/**
 * Pops up an js-alert before deleting if confirmed
 * @param url {string} the url to send the delete request
 * @param refresh {string} the name of the part of the store that should be refreshed afterwards
 * @param message {string} The message to be shown in the alert, defaults to 'Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?'
 * @return {Promise}
 */
export const confirmAndDelete =
    ({url, refresh = null, message = 'Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?'}) =>
        dispatch => (confirm(message)) ? dispatch(directDelete({url, refresh})) : Promise.resolve('canceled');
