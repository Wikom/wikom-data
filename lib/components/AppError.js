"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactSymbol = _interopRequireDefault(require("react-symbol"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by rouven on 29.03.17.
 */

/**
 * @class AppError
 * @classdesc  This is the main component for the graphical errors shown as soon as a javascript error occurs.
 */
var SingleError = function SingleError(_ref) {
  var error = _ref.error;
  return _react["default"].createElement("div", {
    className: "alert alert-danger",
    id: "page-alert-danger",
    role: "alert"
  }, _react["default"].createElement("button", {
    type: "button",
    className: "close",
    "data-dismiss": "alert",
    "aria-label": "Close"
  }, _react["default"].createElement(_reactSymbol["default"], {
    symbol: "times"
  })), _react["default"].createElement("h4", null, _react["default"].createElement(_reactSymbol["default"], {
    symbol: {
      symbol: 'ban',
      className: 'icon'
    }
  }), error.status, " ", error.name), _react["default"].createElement("ul", null, _react["default"].createElement("li", null, error.message)));
};
/**
 * Constructs an AppError UI widget, that shows errors stored in the store.
 * @param errors {array} the errors to be displayed
 * @constructor
 */


var AppError = function AppError(_ref2) {
  var errors = _ref2.errors;
  return errors.length > 0 ? _react["default"].createElement("div", null, errors.map(function (error, i) {
    return _react["default"].createElement(SingleError, {
      key: i,
      error: error
    });
  })) : null;
};

AppError.defaultProps = {
  errors: []
};
AppError.propTypes = {
  errors: _propTypes["default"].arrayOf(_propTypes["default"].object)
};

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    errors: state.errors
  };
};

var AppErrorContainer = (0, _reactRedux.connect)(mapStateToProps)(AppError);
var _default = AppErrorContainer;
exports["default"] = _default;