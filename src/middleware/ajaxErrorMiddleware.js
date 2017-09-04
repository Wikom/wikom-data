/**
 * Created by rouven on 08.03.17.
 */
/**
 * @module
 */
/**
 * @author rouven
 */
import {types as actionTypes} from '../actions'

/**
 * Middleware that changes the href of the current window/tab if an 401 unauthorized Response is received.

 * @category middleware
 * @param target {string} the url to redirect to
 * @param store {object} the app store
 * @param next {function} the next middleware
 * @param action {objecŧ} the action to be dispatched
 * @return {function} next applied to action
 */
const ajaxErrorMiddleware = target => store => next => action => {
    if (action.type === actionTypes.LOAD_DATA_FAILURE && action.error.status === 401) {
        location.href = target;
    }

    return next(action);
};

export default ajaxErrorMiddleware;