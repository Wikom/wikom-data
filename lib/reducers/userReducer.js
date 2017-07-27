'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require('../actions/actionTypes');

/**
 * Handles the SET_USER action.  Changes the user in the app state.
 * @public
 * @param state {object} the current state
 * @param action {object} the dispatched action
 * @returns {{}}
 */
var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.SET_USER:
      return action.user;
    default:
      return state;
  }
}; /**
    * Created by rouven on 12.04.17.
    */

/**
 * @module
 */
/**
 * @author rouven
 */

exports.default = userReducer;