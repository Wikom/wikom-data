"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actionTypes = require("../actions/actionTypes");

var _reactRouterRedux = require("react-router-redux");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Handles failure cases (LOAD_DATA_FAILURE and LOCATION_CHANGE).
 * If LOAD_DATA_FAILURE, it concats an error to the store, which then gets displayed in the AppErrorComponent
 * If LOCATION_CHANGE, it emptys the current store.
 * @public
 * @param {array | object} state The current state
 * @param {object} action The dispatched action
 * @returns {array | object} The new state after performing the action
 */
var errorReducer = function errorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.LOAD_DATA_FAILURE:
      var error = {
        status: 0,
        name: 'Unbekannter Fehler',
        message: 'Es ist ein unbekannter Fehler aufgetreten.',
        code: 0
      };

      if (_typeof(action.error) === 'object') {
        error.status = action.error.status;

        if (_typeof(action.error.response) === 'object' && _typeof(action.error.response.body) === 'object') {
          error.name = action.error.response.body.name;
          error.message = action.error.response.body.message;

          if (action.error.response.body.hasOwnProperty('code')) {
            error.code = action.error.response.body.code;
          }
        }
      }

      return state.concat(error);

    case _reactRouterRedux.LOCATION_CHANGE:
      return [];

    default:
      return state;
  }
};

var _default = errorReducer;
exports["default"] = _default;