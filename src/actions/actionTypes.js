/**
 * Created by rouven on 15.03.17.
 */

/**
 * @module
 */

/**
 * @author rouven
 */

/**
 * Prefix for all actions defined in this module
 * @type {string}
 */
const PREFIX = '@@wikom-data/';

/**
 * Action type for pending ajax requests
 * @type {string}
 */
export const LOAD_DATA_PENDING = PREFIX + 'LOAD_DATA_PENDING';
/**
 * Action type for successfull ajax requests
 * @type {string}
 */
export const LOAD_DATA_SUCCESS = PREFIX + 'LOAD_DATA_SUCCESS';
/**
 * Action type for ajax requests that fail on server side
 * @type {string}
 */
export const LOAD_DATA_FAILURE = PREFIX + 'LOAD_DATA_FAILURE';
/**
 * Action type for ajax requests that fail on client side
 * @type {string}
 */
export const LOAD_DATA_CANCEL = PREFIX + 'LOAD_DATA_CANCEL';
/**
 * Action type for progress response
 * @type {string}
 */
export const LOAD_DATA_PROGRESS = PREFIX + 'LOAD_DATA_PROGRESS';
/**
 * Action type for clearing data from store
 * @type {string}
 */
export const CLEAR_DATA = PREFIX + 'CLEAR_DATA';
/**
 * ACtion type for refreshing data in store
 * @type {string}
 */
export const REFRESH_DATA = PREFIX + 'REFRESH_DATA';
/**
 * Action type to set pagination for next call
 * @type {string}
 */
export const SET_PAGINATION = PREFIX + 'SET_PAGINATION';
/**
 * Action type to clear pagination before next call
 * @type {string}
 */
export const CLEAR_PAGINATION = PREFIX + 'CLEAR_PAGINATION';
/**
 * Action type to set app user
 * @type {string}
 */
export const SET_USER = PREFIX + 'SET_USER';