'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = require('../actions/actionTypes');

var types = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * Created by rouven on 15.03.17.
                                                                                                                                                                                                                   */

/**
 * @module
 */
/**
 * @author rouven
 */

/**
 * Returns the initial request state for the passed url
 * @private
 * @param url {string} the url for the request
 */
var initialRequestState = function initialRequestState(url) {
    return {
        url: url,
        isQueued: false,
        isPending: true,
        isComplete: false,
        percent: 0
    };
};

/**
 * Handles  pending  data  requests  and  cancelation  of  such.   Also  handles  REFRESH_DATA,  CLEAR_DATA and LOAD_DATA_PROGRESS actions.
 * Sets internal properties of the state, that are used to determine thestate of the request (e.g.  isPending or percent).
 * @public
 * @param state {object} the current state
 * @param action {object} the dispatched action
 * @returns {object} the next state
 */
var queriesReducer = function queriesReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case types.LOAD_DATA_PENDING:
            {
                return Object.assign({}, state, _defineProperty({}, action.name, initialRequestState(action.url)));
            }
        case types.LOAD_DATA_SUCCESS:
        case types.LOAD_DATA_FAILURE:
            {
                var requestState = state[action.name] ? Object.assign({}, state[action.name]) : initialRequestState(action.url);

                requestState.isPending = false;
                requestState.isComplete = true;
                requestState.percent = 100;

                return Object.assign({}, state, _defineProperty({}, action.name, requestState));
            }
        case types.LOAD_DATA_CANCEL:
            {
                var nextState = Object.assign({}, state);

                delete nextState[action.name];

                return nextState;
            }
        case types.LOAD_DATA_PROGRESS:
            {
                var _requestState = state[action.name] ? Object.assign({}, state[action.name]) : initialRequestState(action.url);

                _requestState.percent = action.percent;

                return Object.assign({}, state, _defineProperty({}, action.name, _requestState));
            }
        case types.REFRESH_DATA:
            {
                var _requestState2 = state[action.name] ? Object.assign({}, state[action.name]) : initialRequestState(action.url);

                _requestState2.isQueued = true;
                _requestState2.isPending = false;
                _requestState2.isComplete = false;
                _requestState2.percent = 0;

                return Object.assign({}, state, _defineProperty({}, action.name, _requestState2));
            }
        case types.CLEAR_DATA:
            {
                var _nextState = Object.assign({}, state);

                delete _nextState[action.name];

                return _nextState;
            }
        default:
            return state;
    }
};

exports.default = queriesReducer;