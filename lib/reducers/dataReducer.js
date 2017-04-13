'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Created by rouven on 17.03.17.
 */

var dataReducer = function dataReducer() {
    var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


    var combinedReducers = reducers ? (0, _redux.combineReducers)(reducers) : null;

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];


        var nextState = Object.assign({}, state);

        switch (action.type) {
            case types.LOAD_DATA_SUCCESS:
                nextState[action.name] = action.data;
                break;
            case types.LOAD_DATA_FAILURE:
                nextState[action.name] = [];
                break;
            case types.CLEAR_DATA:
                delete nextState[action.name];
                break;
            case types.SET_PAGINATION:
                if (!nextState.pagination) {
                    nextState.pagination = {};
                }

                nextState.pagination[action.name] = action.data;
                break;
            case types.CLEAR_PAGINATION:
                if (!nextState.pagination) {
                    nextState.pagination = {};
                }

                nextState.pagination[action.name] = {};
                break;
            default:
                nextState = state;
        }

        if (combinedReducers) {
            var subState = Object.keys(reducers).reduce(function (acc, val) {
                acc[val] = state[val];
                return acc;
            }, {});

            return Object.assign({}, nextState, combinedReducers(subState, action));
        }

        return nextState;
    };
};

exports.default = dataReducer;