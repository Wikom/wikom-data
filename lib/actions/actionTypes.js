'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
var PREFIX = '@@wikom-data/';

/**
 * Action type for pending ajax requests
 * @type {string}
 */
var LOAD_DATA_PENDING = exports.LOAD_DATA_PENDING = PREFIX + 'LOAD_DATA_PENDING';
/**
 * Action type for successfull ajax requests
 * @type {string}
 */
var LOAD_DATA_SUCCESS = exports.LOAD_DATA_SUCCESS = PREFIX + 'LOAD_DATA_SUCCESS';
/**
 * Action type for ajax requests that fail on server side
 * @type {string}
 */
var LOAD_DATA_FAILURE = exports.LOAD_DATA_FAILURE = PREFIX + 'LOAD_DATA_FAILURE';
/**
 * Action type for ajax requests that fail on client side
 * @type {string}
 */
var LOAD_DATA_CANCEL = exports.LOAD_DATA_CANCEL = PREFIX + 'LOAD_DATA_CANCEL';
/**
 * Action type for progress response
 * @type {string}
 */
var LOAD_DATA_PROGRESS = exports.LOAD_DATA_PROGRESS = PREFIX + 'LOAD_DATA_PROGRESS';
/**
 * Action type for clearing data from store
 * @type {string}
 */
var CLEAR_DATA = exports.CLEAR_DATA = PREFIX + 'CLEAR_DATA';
/**
 * ACtion type for refreshing data in store
 * @type {string}
 */
var REFRESH_DATA = exports.REFRESH_DATA = PREFIX + 'REFRESH_DATA';
/**
 * Action type to set pagination for next call
 * @type {string}
 */
var SET_PAGINATION = exports.SET_PAGINATION = PREFIX + 'SET_PAGINATION';
/**
 * Action type to clear pagination before next call
 * @type {string}
 */
var CLEAR_PAGINATION = exports.CLEAR_PAGINATION = PREFIX + 'CLEAR_PAGINATION';
/**
 * Action type to set app user
 * @type {string}
 */
var SET_USER = exports.SET_USER = PREFIX + 'SET_USER';