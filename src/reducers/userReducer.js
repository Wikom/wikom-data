/**
 * Created by rouven on 12.04.17.
 */

import {SET_USER} from '../actions/actionTypes'

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;