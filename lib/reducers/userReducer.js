'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = require('../actions/actionTypes');

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

exports.default = userReducer;