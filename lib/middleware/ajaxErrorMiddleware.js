"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("../actions");

/**
 * Created by rouven on 08.03.17.
 */

/**
 * @module
 */

/**
 * @author rouven
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
};

var _default = ajaxErrorMiddleware;
exports["default"] = _default;