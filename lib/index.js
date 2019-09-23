"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataProvider", {
  enumerable: true,
  get: function get() {
    return _DataProvider["default"];
  }
});
Object.defineProperty(exports, "AppError", {
  enumerable: true,
  get: function get() {
    return _AppError["default"];
  }
});
Object.defineProperty(exports, "ajaxErrorMiddleware", {
  enumerable: true,
  get: function get() {
    return _ajaxErrorMiddleware["default"];
  }
});
Object.defineProperty(exports, "dataReducer", {
  enumerable: true,
  get: function get() {
    return _dataReducer["default"];
  }
});
Object.defineProperty(exports, "queriesReducer", {
  enumerable: true,
  get: function get() {
    return _queriesReducer["default"];
  }
});
Object.defineProperty(exports, "errorReducer", {
  enumerable: true,
  get: function get() {
    return _errorReducer["default"];
  }
});
Object.defineProperty(exports, "userReducer", {
  enumerable: true,
  get: function get() {
    return _userReducer["default"];
  }
});
exports.actions = exports.actionTypes = exports.upload = exports.directDelete = exports.confirmAndDelete = exports.refreshData = exports.clearData = exports.configureRequest = exports.setUser = exports.submit = exports.download = exports.loadData = exports["default"] = void 0;

var _DataProvider = _interopRequireDefault(require("./components/DataProvider"));

var _AppError = _interopRequireDefault(require("./components/AppError"));

var actionTypes = _interopRequireWildcard(require("./actions/actionTypes"));

exports.actionTypes = actionTypes;

var actions = _interopRequireWildcard(require("./actions"));

exports.actions = actions;

var _ajaxErrorMiddleware = _interopRequireDefault(require("./middleware/ajaxErrorMiddleware"));

var _dataReducer = _interopRequireDefault(require("./reducers/dataReducer"));

var _queriesReducer = _interopRequireDefault(require("./reducers/queriesReducer"));

var _errorReducer = _interopRequireDefault(require("./reducers/errorReducer"));

var _userReducer = _interopRequireDefault(require("./reducers/userReducer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by rouven on 20.03.17.
 */
var loadData = actions.loadData,
    download = actions.download,
    submit = actions.submit,
    setUser = actions.setUser,
    configureRequest = actions.configureRequest,
    clearData = actions.clearData,
    refreshData = actions.refreshData,
    confirmAndDelete = actions.confirmAndDelete,
    directDelete = actions.directDelete,
    upload = actions.upload;
exports.upload = upload;
exports.directDelete = directDelete;
exports.confirmAndDelete = confirmAndDelete;
exports.refreshData = refreshData;
exports.clearData = clearData;
exports.configureRequest = configureRequest;
exports.setUser = setUser;
exports.submit = submit;
exports.download = download;
exports.loadData = loadData;
var _default = _DataProvider["default"];
exports["default"] = _default;