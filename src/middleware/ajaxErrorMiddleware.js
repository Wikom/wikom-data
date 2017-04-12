/**
 * Created by rouven on 08.03.17.
 */

import {types as actionTypes} from '../actions'

const ajaxErrorMiddleware = target => store => next => action => {
    if (action.type === actionTypes.LOAD_DATA_FAILURE && action.error.status === 401) {
        location.href = target;
    }

    return next(action);
};

export default ajaxErrorMiddleware;