"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var types = _interopRequireWildcard(require("../actions/actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Created by rouven on 17.03.17.
 */

/**
 * @module
 */

/**
 * @author rouven
 */

/**
 * The data reducer is the reducer that handles all data and pagination actions (except LOAD_DATA_FAILURE,which gets handled by the errorReducer).
 * It sets or unsets the data storing part in the store.  The name of the action determines that part in the store
 * @public
 * @param reducers {function(object, object)} additional reducers to be called after this
 * @param {array | object} state The current state
 * @param {object} action The dispatched action
 * @returns {object} the next state
 */
var dataReducer = function dataReducer() {
  var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var combinedReducers = reducers ? (0, _redux.combineReducers)(reducers) : null;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
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

var _default = dataReducer;
exports["default"] = _default;