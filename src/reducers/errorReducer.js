/**
 * Created by rouven on 29.03.17.
 */

import {LOAD_DATA_FAILURE} from '../actions/actionTypes'
import {LOCATION_CHANGE} from 'react-router-redux'

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