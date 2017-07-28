/**
 * Created by rouven on 29.03.17.
 */
/**
 * @module
 */

/**
 * @author rouven
 */

import {LOAD_DATA_FAILURE} from '../actions/actionTypes'
import {LOCATION_CHANGE} from 'react-router-redux'

/**
 * Handles failure cases (LOAD_DATA_FAILURE and LOCATION_CHANGE).
 * If LOAD_DATA_FAILURE, it concats an error to the store, which then gets displayed in the AppErrorComponent
 * If LOCATION_CHANGE, it emptys the current store.
 * @public
 * @param {array | object} state The current state
 * @param {object} action The dispatched action
 * @returns {array | object} The new state after performing the action
 */
const errorReducer = (state = [], action) => {

    switch (action.type) {
        case LOAD_DATA_FAILURE:
            const error = {
                status: 0,
                name: 'Unbekannter Fehler',
                message: 'Es ist ein unbekannter Fehler aufgetreten.'
            };

            if (typeof action.error === 'object') {
                error.status = action.error.status;

                if (typeof action.error.response === 'object' && typeof action.error.response.body === 'object') {
                    error.name = action.error.response.body.name;
                    error.message = action.error.response.body.message;
                }
            }

            return state.concat(error);
        case LOCATION_CHANGE:
            return [];
        default:
            return state;
    }
};

export default errorReducer;