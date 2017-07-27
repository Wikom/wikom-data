/**
 * Created by rouven on 12.04.17.
 */


/**
 * @module
 */
/**
 * @author rouven
 */

import {SET_USER} from '../actions/actionTypes'

/**
 * Handles the SET_USER action.  Changes the user in the app state.
 * @public
 * @param state {object} the current state
 * @param action {object} the dispatched action
 * @returns {{}}
 */
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;