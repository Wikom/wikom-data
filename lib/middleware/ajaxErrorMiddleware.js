'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('../actions');

/**
 * Middleware that changes the href of the current window/tab if an 401 unauthorized Response is received.

 * @category middleware
 * @param target {string} the url to redirect to
 * @param store {object} the app store
 * @param next {function} the next middleware
 * @param action {objecŧ} the action to be dispatched
 * @return {function} next applied to action
 */
var ajaxErrorMiddleware = function ajaxErrorMiddleware(target) {
  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === _actions.types.LOAD_DATA_FAILURE && action.error.status === 401) {
          location.href = target;
        }

        return next(action);
      };
    };
  };
}; /**
    * Created by rouven on 08.03.17.
    */
/**
 * @module
 */
/**
 * @author rouven
 */
exports.default = ajaxErrorMiddleware;