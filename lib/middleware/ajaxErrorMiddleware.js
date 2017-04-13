'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('../actions');

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

exports.default = ajaxErrorMiddleware;