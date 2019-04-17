"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SET_USER = exports.CLEAR_PAGINATION = exports.SET_PAGINATION = exports.REFRESH_DATA = exports.CLEAR_DATA = exports.LOAD_DATA_PROGRESS = exports.LOAD_DATA_CANCEL = exports.LOAD_DATA_FAILURE = exports.LOAD_DATA_SUCCESS = exports.LOAD_DATA_PENDING = void 0;

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

var LOAD_DATA_PENDING = PREFIX + 'LOAD_DATA_PENDING';
/**
 * Action type for successfull ajax requests
 * @type {string}
 */

exports.LOAD_DATA_PENDING = LOAD_DATA_PENDING;
var LOAD_DATA_SUCCESS = PREFIX + 'LOAD_DATA_SUCCESS';
/**
 * Action type for ajax requests that fail on server side
 * @type {string}
 */

exports.LOAD_DATA_SUCCESS = LOAD_DATA_SUCCESS;
var LOAD_DATA_FAILURE = PREFIX + 'LOAD_DATA_FAILURE';
/**
 * Action type for ajax requests that fail on client side
 * @type {string}
 */

exports.LOAD_DATA_FAILURE = LOAD_DATA_FAILURE;
var LOAD_DATA_CANCEL = PREFIX + 'LOAD_DATA_CANCEL';
/**
 * Action type for progress response
 * @type {string}
 */

exports.LOAD_DATA_CANCEL = LOAD_DATA_CANCEL;
var LOAD_DATA_PROGRESS = PREFIX + 'LOAD_DATA_PROGRESS';
/**
 * Action type for clearing data from store
 * @type {string}
 */

exports.LOAD_DATA_PROGRESS = LOAD_DATA_PROGRESS;
var CLEAR_DATA = PREFIX + 'CLEAR_DATA';
/**
 * ACtion type for refreshing data in store
 * @type {string}
 */

exports.CLEAR_DATA = CLEAR_DATA;
var REFRESH_DATA = PREFIX + 'REFRESH_DATA';
/**
 * Action type to set pagination for next call
 * @type {string}
 */

exports.REFRESH_DATA = REFRESH_DATA;
var SET_PAGINATION = PREFIX + 'SET_PAGINATION';
/**
 * Action type to clear pagination before next call
 * @type {string}
 */

exports.SET_PAGINATION = SET_PAGINATION;
var CLEAR_PAGINATION = PREFIX + 'CLEAR_PAGINATION';
/**
 * Action type to set app user
 * @type {string}
 */

exports.CLEAR_PAGINATION = CLEAR_PAGINATION;
var SET_USER = PREFIX + 'SET_USER';
exports.SET_USER = SET_USER;