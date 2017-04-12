/**
 * Created by rouven on 17.03.17.
 */

import {combineReducers} from 'redux';
import * as types from '../actions/actionTypes'

const dataReducer = (reducers = null) => {

    const combinedReducers = reducers ? combineReducers(reducers) : null;

    return (state = {}, action) => {

        let nextState = Object.assign({}, state);

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
            const subState = Object.keys(reducers).reduce((acc, val) => {
                acc[val] = state[val];
                return acc;
            }, {});

            return Object.assign({}, nextState, combinedReducers(subState, action));
        }

        return nextState;
    };
};

export default dataReducer;