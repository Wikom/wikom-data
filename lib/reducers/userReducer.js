"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actionTypes = require("../actions/actionTypes");

/**
 * Created by rouven on 12.04.17.
 */

/**
 * @module
 */

/**
 * @author rouven
 */

/**
 * Handles the SET_USER action.  Changes the user in the app state.
 * @public
 * @param state {object} the current state
 * @param action {object} the dispatched action
 * @returns {{}}
 */
var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actionTypes.SET_USER:
      return action.user;

    default:
      return state;
  }
};

var _default = userReducer;
exports["default"] = _default;