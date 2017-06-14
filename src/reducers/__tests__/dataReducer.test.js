/**
 * Created by dennis on 19.05.17.
 */

import * as types from '../../actions/actionTypes'
import dataReducer from '../dataReducer'
import configureStore from 'redux-mock-store'

function setup(storeData) {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
}

describe('reducers', () => {
    describe('dataReducer', () => {
        it('should return an empty initial state', () => {
            const nextState = dataReducer()(undefined, {});
            expect(nextState).toEqual({});
        })
        it('should set the data in store if the action is a LOAD_DATA_SUCCESS', () => {
            const mockAction = {
                name: "mockaction",
                type: types.LOAD_DATA_SUCCESS,
                data: {testkey: "testvalue"}
            }
            const {mockStore} = setup();
            const nextState = dataReducer()(undefined, mockAction);
            expect(nextState.hasOwnProperty('mockaction')).toBe(true);
            expect(nextState.mockaction).toEqual({testkey: "testvalue"});
        })
        it('should be able to override existing data in the store', () => {
            const mockAction = {
                name: "mockaction",
                type: types.LOAD_DATA_SUCCESS,
                data: {testkey: "testvalue"}
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({testkey: "oldtestvalue"}, mockAction);
            expect(nextState.hasOwnProperty('mockaction')).toBe(true);
            expect(nextState.mockaction).toEqual({testkey: "testvalue"});
        })
        it('should be able to handle integers as keys', () => {
            const mockAction = {
                name: "mockaction",
                type: types.LOAD_DATA_SUCCESS,
                data: {0: "testvalue"}
            }
            const {mockStore} = setup();
            const nextState = dataReducer()(undefined, mockAction);
            expect(nextState.hasOwnProperty('mockaction'));
            expect(nextState.mockaction).toEqual({0: "testvalue"});
        })
        it('should be able to merge the state', () => {
            const mockAction = {
                name: "mock",
                type: types.LOAD_DATA_SUCCESS,
                data: {test1: "test"}
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({test2: "notchanged"}, mockAction);
            expect(nextState.hasOwnProperty("mock")).toBe(true);
            expect(nextState.hasOwnProperty("test2")).toBe(true);
            expect(nextState.mock).toEqual({test1: "test"});
            expect(nextState.test2).toEqual("notchanged");
        })
        it('should add empty data to the property if LOAD_DATA_FAILURE', () => {
            const mockAction = {
                name: "testFailure",
                type: types.LOAD_DATA_FAILURE,
            }
            const {mockStore} = setup();
            const nextState = dataReducer()(undefined, mockAction);
            expect(nextState.hasOwnProperty("testFailure")).toBe(true);
            expect(nextState.testFailure).toEqual([]);
        })
        it('should unset old data on failure', () => {
            const mockAction = {
                name: "testFailure",
                type: types.LOAD_DATA_FAILURE
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({testFailure: "olddata"}, mockAction);
            expect(nextState.hasOwnProperty("testFailure")).toBe(true);
            expect(nextState.testFailure).toEqual([]);
        })
        it('should ignore the data property on failure', () => {
            const mockAction = {
                name: "testFailure",
                type: types.LOAD_DATA_FAILURE,
                data: "somedata",
            }
            const {mockStore} = setup();
            const nextState = dataReducer()(undefined, mockAction);
            expect(nextState.hasOwnProperty("testFailure")).toBe(true);
            expect(nextState.testFailure).toEqual([]);
        })
        it('should unset exisiting property on CLEAR_DATA', () => {
            const mockAction = {
                name: "clearme",
                type: types.CLEAR_DATA
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({clearme: "olddata"}, mockAction);
            expect(nextState.hasOwnProperty("clearme")).toBe(false);
        })
        it('should do nothing if the property for CLEAR_DATA does not exist', () => {
            const mockAction = {
                name: "clearme",
                type: types.CLEAR_DATA
            }
            const {mockStore} = setup();
            const nextState = dataReducer()(undefined, mockAction);
            expect(nextState.hasOwnProperty('clearme')).toBe(false);
        })
        it('should set the pagination for SET_PAGINATION', () => {
            const mockAction = {
                name: "pageme",
                type: types.SET_PAGINATION,
                data: "random"
            }
            const {mockStore} = setup();
            const nextState = dataReducer()(undefined, mockAction);
            expect(nextState.hasOwnProperty('pagination')).toBe(true);
            expect(nextState.pagination.hasOwnProperty("pageme")).toBe(true);
            expect(nextState.pagination.pageme).toEqual("random");
        })
        it('should overwrite old pagination', () => {
            const mockAction = {
                name: "pageme",
                type: types.SET_PAGINATION,
                data: "random"
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({pagination: {pageme: "old"}}, mockAction);
            expect(nextState.hasOwnProperty('pagination')).toBe(true);
            expect(nextState.pagination.hasOwnProperty("pageme")).toBe(true);
            expect(nextState.pagination.pageme).toEqual("random");
        })
        it("should not overwrite other paginations", () => {
            const mockAction = {
                name: "pageme",
                type: types.SET_PAGINATION,
                data: "random"
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({pagination: {pagehimnotme: "old"}}, mockAction);
            expect(nextState.hasOwnProperty('pagination')).toBe(true);
            expect(nextState.pagination.hasOwnProperty("pageme")).toBe(true);
            expect(nextState.pagination.pageme).toEqual("random");
            expect(nextState.pagination.hasOwnProperty("pagehimnotme")).toBe(true);
            expect(nextState.pagination.pagehimnotme).toEqual("old");
        })
        it("should clear pagination on CLEAR_PAGINATION", () => {
            const mockAction = {
                name: "pageme",
                type: types.CLEAR_PAGINATION,
                data: "random"
            }
            const {mockStore} = setup();
            const nextState = dataReducer()({pagination: {pageme: "old"}}, mockAction);
            expect(nextState.hasOwnProperty('pagination')).toBe(true);
            expect(nextState.pagination.hasOwnProperty("pageme")).toBe(true);
            expect(nextState.pagination.pageme).toEqual({})
        })
    })
})