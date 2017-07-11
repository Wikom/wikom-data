'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submit = exports.download = exports.loadData = exports.clearPagination = exports.setPagination = exports.refreshData = exports.clearData = exports.loadDataProgress = exports.loadDataCancel = exports.loadDataFailure = exports.loadDataSuccess = exports.loadDataPending = exports.types = exports.del = exports.put = exports.post = exports.get = exports.baseRequest = exports.configureRequest = exports.setUser = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _findInObject = require('find-in-object');

var _findInObject2 = _interopRequireDefault(_findInObject);

var _fileSaver = require('file-saver');

var _actionTypes = require('./actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rouven on 15.03.17.
 */

var setUser = exports.setUser = function setUser(_ref) {
    var user = _ref.user;
    return {
        type: types.SET_USER,
        user: user
    };
};

/**
 * new API
 */

var requestHeaders = {};

var configureRequest = exports.configureRequest = function configureRequest() {
    return function (dispatch, getState) {
        var token = (0, _findInObject2.default)('user.access_token', getState());

        if (token) {
            requestHeaders.Accept = 'application/json';
            requestHeaders.Authorization = 'Bearer ' + token;
        }
    };
};

var baseRequest = exports.baseRequest = function baseRequest(_ref2) {
    var _ref2$method = _ref2.method,
        method = _ref2$method === undefined ? 'GET' : _ref2$method,
        url = _ref2.url;
    return (0, _superagent2.default)(method, url).set(requestHeaders);
};

var get = exports.get = function get(_ref3) {
    var url = _ref3.url;
    return baseRequest({ url: url });
};

var post = exports.post = function post(_ref4) {
    var url = _ref4.url,
        data = _ref4.data;
    return baseRequest({ method: 'POST', url: url }).send(data);
};

var put = exports.put = function put(_ref5) {
    var url = _ref5.url,
        data = _ref5.data;
    return baseRequest({ method: 'PUT', url: url }).send(data);
};

var del = exports.del = function del(_ref6) {
    var url = _ref6.url;
    return baseRequest({ method: 'DELETE', url: url });
};

exports.types = types;
var loadDataPending = exports.loadDataPending = function loadDataPending(_ref7) {
    var name = _ref7.name,
        url = _ref7.url;
    return {
        type: types.LOAD_DATA_PENDING,
        name: name,
        url: url
    };
};

var loadDataSuccess = exports.loadDataSuccess = function loadDataSuccess(_ref8) {
    var name = _ref8.name,
        url = _ref8.url,
        data = _ref8.data;
    return {
        type: types.LOAD_DATA_SUCCESS,
        name: name,
        url: url,
        data: data
    };
};

var loadDataFailure = exports.loadDataFailure = function loadDataFailure(_ref9) {
    var name = _ref9.name,
        url = _ref9.url,
        error = _ref9.error;
    return {
        type: types.LOAD_DATA_FAILURE,
        name: name,
        url: url,
        error: error
    };
};

var loadDataCancel = exports.loadDataCancel = function loadDataCancel(_ref10) {
    var name = _ref10.name,
        url = _ref10.url;
    return {
        type: types.LOAD_DATA_CANCEL,
        name: name,
        url: url
    };
};

var loadDataProgress = exports.loadDataProgress = function loadDataProgress(_ref11) {
    var name = _ref11.name,
        url = _ref11.url,
        percent = _ref11.percent;
    return {
        type: types.LOAD_DATA_PROGRESS,
        name: name,
        url: url,
        percent: percent
    };
};

var clearData = exports.clearData = function clearData(_ref12) {
    var name = _ref12.name;
    return {
        type: types.CLEAR_DATA,
        name: name
    };
};

var refreshData = exports.refreshData = function refreshData(_ref13) {
    var name = _ref13.name;
    return {
        type: types.REFRESH_DATA,
        name: name
    };
};

var setPagination = exports.setPagination = function setPagination(_ref14) {
    var name = _ref14.name,
        data = _ref14.data;
    return {
        type: types.SET_PAGINATION,
        name: name,
        data: data
    };
};

var clearPagination = exports.clearPagination = function clearPagination(_ref15) {
    var name = _ref15.name;
    return {
        type: types.CLEAR_PAGINATION,
        name: name
    };
};

var loadData = exports.loadData = function loadData(_ref16) {
    var name = _ref16.name,
        url = _ref16.url;
    return function (dispatch, getState) {
        if (getState().queries.pending && getState().queries.pending.indexOf(url) !== -1) {
            return;
        }

        dispatch(loadDataPending({ name: name, url: url }));

        var req = get({ url: url });
        var promise = req.on('progress', function (event) {
            /* the event is:
             {
             direction: "upload" or "download"
             percent: 0 to 100 // may be missing if file size is unknown
             total: // total file size, may be missing
             loaded: // bytes downloaded or uploaded so far
             } */
            dispatch(loadDataProgress({ name: name, url: url, percent: event.percent || 100 }));
        }).then(function (response) {

            promise.cancel = function () {
                console.log('promise resolved - cancel disabled...');
            };

            if (response.ok && response.body) {
                dispatch(loadDataSuccess({ name: name, url: url, data: response.body.data }));

                if (response.header['x-pagination-current-page']) {
                    var pagination = {
                        currentPage: Number(response.header['x-pagination-current-page']),
                        pageCount: Number(response.header['x-pagination-page-count']),
                        perPage: Number(response.header['x-pagination-per-page']),
                        totalCount: Number(response.header['x-pagination-total-count'])
                    };
                    dispatch(setPagination({ name: name, data: pagination }));
                }
            }
        }).catch(function (error) {
            dispatch(loadDataFailure({ name: name, url: url, error: error }));
            dispatch(clearPagination({ name: name }));
        });

        promise.cancel = function () {
            req.abort();
            dispatch(loadDataCancel({ name: name, url: url }));
        };

        return promise;
    };
};

var download = exports.download = function download(_ref17) {
    var name = _ref17.name,
        url = _ref17.url;
    return function (dispatch) {
        dispatch(loadDataPending({ name: name, url: url }));

        var getFilename = function getFilename(header) {
            var disposition = header['content-disposition'];

            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches && matches[1]) {
                    return matches[1].replace(/['"]/g, '');
                }
            }

            return null;
        };

        var req = get({ url: url });
        var promise = req.responseType('blob').on('progress', function (event) {
            /* the event is:
             {
             direction: "upload" or "download"
             percent: 0 to 100 // may be missing if file size is unknown
             total: // total file size, may be missing
             loaded: // bytes downloaded or uploaded so far
             } */
            dispatch(loadDataProgress({ name: name, url: url, percent: event.percent || 100 }));
        }).then(function (response) {

            promise.cancel = function () {
                console.log('promise resolved - cancel disabled...');
            };

            if (response.ok && response.body) {
                var filename = getFilename(response.header) || name;

                (0, _fileSaver.saveAs)(response.body, filename);
                dispatch(loadDataSuccess({ name: name, url: url, data: null }));
            }
        }).catch(function (error) {
            dispatch(loadDataFailure({ name: name, url: url, error: error }));
        });

        promise.cancel = function () {
            req.abort();
            dispatch(loadDataCancel({ name: name, url: url }));
        };

        return promise;
    };
};

var submit = exports.submit = function submit(_ref18) {
    var url = _ref18.url,
        _ref18$data = _ref18.data,
        data = _ref18$data === undefined ? {} : _ref18$data,
        _ref18$primaryKey = _ref18.primaryKey,
        primaryKey = _ref18$primaryKey === undefined ? 'id' : _ref18$primaryKey;
    return function () {
        var req = data.hasOwnProperty(primaryKey) ? put({ url: url + '/' + (0, _findInObject2.default)(primaryKey, data), data: data }) : post({ url: url, data: data });

        var promise = req;

        promise.cancel = function () {
            return req.abort();
        };

        return promise;
    };
};