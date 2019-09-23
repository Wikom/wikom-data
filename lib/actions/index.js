"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.confirmAndDelete = exports.directDelete = exports.upload = exports.submit = exports.download = exports.loadData = exports.clearPagination = exports.setPagination = exports.refreshData = exports.clearData = exports.loadDataProgress = exports.loadDataCancel = exports.loadDataFailure = exports.loadDataSuccess = exports.loadDataPending = exports.del = exports.put = exports.post = exports.get = exports.baseRequest = exports.configureRequest = exports.setUser = void 0;

var _superagent = _interopRequireDefault(require("superagent"));

var _findInObject = _interopRequireDefault(require("find-in-object"));

var _fileSaver = require("file-saver");

var types = _interopRequireWildcard(require("./actionTypes"));

exports.types = types;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by rouven on 15.03.17.
 */

/**
 * @module
 */

/**
 * @overview The functions described in this section all take only one object as parameter. The parameters described in the following are the keys of this object.
 */

/**
 * Action to dispatch if the app user should change
 * @param user {object} the new user
 */
var setUser = function setUser(_ref) {
  var user = _ref.user;
  return {
    type: types.SET_USER,
    user: user
  };
};
/**
 * new API
 */

/**
 * @private
 * @type {{}}
 */


exports.setUser = setUser;
var requestHeaders = {};
/**
 * @private
 */

var configureRequest = function configureRequest() {
  return function (dispatch, getState) {
    var token = (0, _findInObject["default"])('user.access_token', getState());

    if (token) {
      requestHeaders.Accept = 'application/json';
      requestHeaders.Authorization = 'Bearer ' + token;
    }
  };
};
/**
 * @private
 * @param method
 * @param url
 */


exports.configureRequest = configureRequest;

var baseRequest = function baseRequest(_ref2) {
  var _ref2$method = _ref2.method,
      method = _ref2$method === void 0 ? 'GET' : _ref2$method,
      url = _ref2.url;
  return (0, _superagent["default"])(method, url).set(requestHeaders);
};
/**
 * @private
 * @param url
 */


exports.baseRequest = baseRequest;

var get = function get(_ref3) {
  var url = _ref3.url;
  return baseRequest({
    url: url
  });
};
/**
 * @private
 * @param url
 * @param data
 */


exports.get = get;

var post = function post(_ref4) {
  var url = _ref4.url,
      data = _ref4.data;
  return baseRequest({
    method: 'POST',
    url: url
  }).send(data);
};
/**
 * @private
 * @param url
 * @param data
 */


exports.post = post;

var put = function put(_ref5) {
  var url = _ref5.url,
      data = _ref5.data;
  return baseRequest({
    method: 'PUT',
    url: url
  }).send(data);
};
/**
 * @private
 * @param url
 */


exports.put = put;

var del = function del(_ref6) {
  var url = _ref6.url;
  return baseRequest({
    method: 'DELETE',
    url: url
  });
};
/**
 * @private
 */


exports.del = del;

/**
 * Action to dispatch as soon as an ajax request has started and is not finished
 * @param name {string} The name of the request (to determine where to store in store)
 * @param url {string} The url for the request
 */
var loadDataPending = function loadDataPending(_ref7) {
  var name = _ref7.name,
      url = _ref7.url;
  return {
    type: types.LOAD_DATA_PENDING,
    name: name,
    url: url
  };
};
/**
 * Action to dispatch as soon as an api request finishes successfully
 * @param name {string} The name of the request (to determine where to store in store)
 * @param url {string} The url for the request
 * @param data {object} The data that was returned by the server
 */


exports.loadDataPending = loadDataPending;

var loadDataSuccess = function loadDataSuccess(_ref8) {
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
/**
 * Action to dispatch as soon as an api request failes on serverside
 * @param name {string} The name of the request (to determine where to store in store)
 * @param url {string} The url for the request
 * @param error {string} The error that was returned by the server
 */


exports.loadDataSuccess = loadDataSuccess;

var loadDataFailure = function loadDataFailure(_ref9) {
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
/**
 * Action to dispatch as soon as an api request fails on clientside
 * @param name {string} The name of the request
 * @param url {string} The url of the request
 */


exports.loadDataFailure = loadDataFailure;

var loadDataCancel = function loadDataCancel(_ref10) {
  var name = _ref10.name,
      url = _ref10.url;
  return {
    type: types.LOAD_DATA_CANCEL,
    name: name,
    url: url
  };
};
/**
 * Action to dispatch on progress message from server
 * @param name {string} The name of the request
 * @param url {string} the url of the request
 * @param percent {float} the percentage of completion
 */


exports.loadDataCancel = loadDataCancel;

var loadDataProgress = function loadDataProgress(_ref11) {
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
/**
 * Action to dispatch if the "name" part of the store is to be cleared
 * @param name {string} the name of the part of the store that is to be cleared
 */


exports.loadDataProgress = loadDataProgress;

var clearData = function clearData(_ref12) {
  var name = _ref12.name;
  return {
    type: types.CLEAR_DATA,
    name: name
  };
};
/**
 * Action to dispatch if the "name" part of the store is to be refreshed
 * @param name {string} the name of the part of the store that is to be refreshed
 */


exports.clearData = clearData;

var refreshData = function refreshData(_ref13) {
  var name = _ref13.name;
  return {
    type: types.REFRESH_DATA,
    name: name
  };
};
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


exports.refreshData = refreshData;

var setPagination = function setPagination(_ref14) {
  var name = _ref14.name,
      data = _ref14.data;
  return {
    type: types.SET_PAGINATION,
    name: name,
    data: data
  };
};
/**
 * Action to dispatch if the "next request with name"s pagination should be cleared
 * @param name {string} the name of the request
 */


exports.setPagination = setPagination;

var clearPagination = function clearPagination(_ref15) {
  var name = _ref15.name;
  return {
    type: types.CLEAR_PAGINATION,
    name: name
  };
};
/**
 * Action to dispatch to load data from an url into the store
 * @param name {string} the name where to store the data
 * @param url {string} the url to send the request
 * @return {Promise}
 */


exports.clearPagination = clearPagination;

var loadData = function loadData(_ref16) {
  var name = _ref16.name,
      url = _ref16.url;
  return function (dispatch, getState) {
    if (getState().queries.pending && getState().queries.pending.indexOf(url) !== -1) {
      return;
    }

    dispatch(loadDataPending({
      name: name,
      url: url
    }));
    var req = get({
      url: url
    });
    var promise = req.on('progress', function (event) {
      /* the event is:
       {
       direction: "upload" or "download"
       percent: 0 to 100 // may be missing if file size is unknown
       total: // total file size, may be missing
       loaded: // bytes downloaded or uploaded so far
       } */
      dispatch(loadDataProgress({
        name: name,
        url: url,
        percent: event.percent || 100
      }));
    }).then(function (response) {
      promise.cancel = function () {// console.log('promise resolved - cancel disabled...')
      };

      if (response.ok && response.body) {
        dispatch(loadDataSuccess({
          name: name,
          url: url,
          data: response.body.data
        }));

        if (response.header['x-pagination-current-page']) {
          var pagination = {
            currentPage: Number(response.header['x-pagination-current-page']),
            pageCount: Number(response.header['x-pagination-page-count']),
            perPage: Number(response.header['x-pagination-per-page']),
            totalCount: Number(response.header['x-pagination-total-count'])
          };
          dispatch(setPagination({
            name: name,
            data: pagination
          }));
        }
      }
    }, function (error) {
      dispatch(loadDataFailure({
        name: name,
        url: url,
        error: error
      }));
      dispatch(clearPagination({
        name: name
      }));
    });

    promise.cancel = function () {
      req.abort();
      dispatch(loadDataCancel({
        name: name,
        url: url
      }));
    };

    return promise;
  };
};
/**
 * Action to start a file download with progress information
 * @param name {string} the name of the request
 * @param url {string} the url of the file to download
 * @return {Promise}
 */


exports.loadData = loadData;

var download = function download(_ref17) {
  var name = _ref17.name,
      url = _ref17.url;
  return function (dispatch) {
    dispatch(loadDataPending({
      name: name,
      url: url
    }));

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

    var req = get({
      url: url
    });
    var promise = req.responseType('blob').on('progress', function (event) {
      /* the event is:
       {
       direction: "upload" or "download"
       percent: 0 to 100 // may be missing if file size is unknown
       total: // total file size, may be missing
       loaded: // bytes downloaded or uploaded so far
       } */
      dispatch(loadDataProgress({
        name: name,
        url: url,
        percent: event.percent || 100
      }));
    }).then(function (response) {
      promise.cancel = function () {// console.log('promise resolved - cancel disabled...')
      };

      if (response.ok && response.body) {
        var filename = getFilename(response.header) || name;
        (0, _fileSaver.saveAs)(response.body, filename);
        dispatch(loadDataSuccess({
          name: name,
          url: url,
          data: null
        }));
      }
    }, function (error) {
      dispatch(loadDataFailure({
        name: name,
        url: url,
        error: error
      }));
    });

    promise.cancel = function () {
      req.abort();
      dispatch(loadDataCancel({
        name: name,
        url: url
      }));
    };

    return promise;
  };
};
/**
 * Action to submit data to an endpoint. Sends a put or post request depending on wether the datas primaryKey attribute is set or not.
 * @param url {string} the url to submit to
 * @param data {object} the data to submit
 * @param primaryKey {string} the primaryKey attributes name in the data, defaults to id
 * @return {Promise}
 */


exports.download = download;

var submit = function submit(_ref18) {
  var url = _ref18.url,
      _ref18$data = _ref18.data,
      data = _ref18$data === void 0 ? {} : _ref18$data,
      _ref18$primaryKey = _ref18.primaryKey,
      primaryKey = _ref18$primaryKey === void 0 ? 'id' : _ref18$primaryKey;
  return function () {
    var req = data.hasOwnProperty(primaryKey) ? put({
      url: url + '/' + (0, _findInObject["default"])(primaryKey, data),
      data: data
    }) : post({
      url: url,
      data: data
    });
    var promise = req;

    promise.cancel = function () {
      return req.abort();
    };

    return promise;
  };
};
/**
 * Action to upload data to an endpoint.
 * @param url {string} the url to submit to
 * @param data {object} the data to submit
 * @param primaryKey {string} the primaryKey attributes name in the data, defaults to id
 * @return {Promise}
 */


exports.submit = submit;

var upload = function upload(_ref19) {
  var url = _ref19.url,
      _ref19$data = _ref19.data,
      data = _ref19$data === void 0 ? {} : _ref19$data,
      _ref19$primaryKey = _ref19.primaryKey,
      primaryKey = _ref19$primaryKey === void 0 ? 'id' : _ref19$primaryKey;
  return function () {
    var req = data.hasOwnProperty(primaryKey) ? baseRequest({
      method: 'PUT',
      url: url + '/' + (0, _findInObject["default"])(primaryKey, data),
      data: data
    }) : baseRequest({
      method: 'POST',
      url: url
    });
    Object.keys(data).forEach(function (field) {
      if (data[field] instanceof File) {
        req.attach(field, data[field]);
      } else {
        req.field(field, data[field]);
      }
    });
    var promise = req;

    promise.cancel = function () {
      return req.abort();
    };

    return promise;
  };
};
/**
 * Sends an delete request to a server
 * @param url {string} the url to send the request to
 * @return {Promise}
 */


exports.upload = upload;

var executeDelete = function executeDelete(_ref20) {
  var url = _ref20.url;
  return function () {
    var req = del({
      url: url
    });
    var promise = req;

    promise.cancel = function () {
      return req.abort();
    };

    return promise;
  };
};
/**
 * Sends a direct delete request to an endpoint
 * @param url {string} the url to send the delete to
 * @param refresh {string} the name of the part of the store that should be refreshed afterwards
 * @return {Promise}
 */


var directDelete = function directDelete(_ref21) {
  var url = _ref21.url,
      _ref21$refresh = _ref21.refresh,
      refresh = _ref21$refresh === void 0 ? null : _ref21$refresh;
  return function (dispatch) {
    return dispatch(executeDelete({
      url: url
    })).then(function (result) {
      return refresh !== null ? dispatch(refreshData({
        name: refresh
      })) : Promise.resolve('success');
    })["catch"](function (error) {
      return Promise.reject('errored');
    });
  };
};
/**
 * Pops up an js-alert before deleting if confirmed
 * @param url {string} the url to send the delete request
 * @param refresh {string} the name of the part of the store that should be refreshed afterwards
 * @param message {string} The message to be shown in the alert, defaults to 'Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?'
 * @return {Promise}
 */


exports.directDelete = directDelete;

var confirmAndDelete = function confirmAndDelete(_ref22) {
  var url = _ref22.url,
      _ref22$refresh = _ref22.refresh,
      refresh = _ref22$refresh === void 0 ? null : _ref22$refresh,
      _ref22$message = _ref22.message,
      message = _ref22$message === void 0 ? 'Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?' : _ref22$message;
  return function (dispatch) {
    return confirm(message) ? dispatch(directDelete({
      url: url,
      refresh: refresh
    })) : Promise.resolve('canceled');
  };
};

exports.confirmAndDelete = confirmAndDelete;