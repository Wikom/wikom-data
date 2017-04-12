/**
 * Created by rouven on 15.03.17.
 */

import * as types from '../actions/actionTypes'

const initialRequestState = (url) => ({
    url,
    isQueued: false,
    isPending: true,
    isComplete: false,
    percent: 0
});

const queriesReducer = (state = {}, action) => {
    switch (action.type) {
        case types.LOAD_DATA_PENDING: {
            return Object.assign({}, state, {
                [action.name]: initialRequestState(action.url)
            });
        }
        case types.LOAD_DATA_SUCCESS:
        case types.LOAD_DATA_FAILURE: {
            const requestState = state[action.name] ? Object.assign({}, state[action.name]) : initialRequestState(action.url);

            requestState.isPending = false;
            requestState.isComplete = true;
            requestState.percent = 100;

            return Object.assign({}, state, {
                [action.name]: requestState
            });
        }
        case types.LOAD_DATA_CANCEL: {
            const nextState = Object.assign({}, state);

            delete nextState[action.name];

            return nextState;
        }
        case types.LOAD_DATA_PROGRESS: {
            const requestState = state[action.name] ? Object.assign({}, state[action.name]) : initialRequestState(action.url);

            requestState.percent = action.percent;

            return Object.assign({}, state, {
                [action.name]: requestState
            });
        }
        case types.REFRESH_DATA: {
            const requestState = state[action.name] ? Object.assign({}, state[action.name]) : initialRequestState(action.url);

            requestState.isQueued = true;
            requestState.isPending = false;
            requestState.isComplete = false;
            requestState.percent = 0;

            return Object.assign({}, state, {
                [action.name]: requestState
            });
        }
        case types.CLEAR_DATA: {
            const nextState = Object.assign({}, state);

            delete nextState[action.name];

            return nextState;
        }
        default:
            return state;
    }
};

export default queriesReducer;