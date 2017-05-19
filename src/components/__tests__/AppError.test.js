/**
 * Created by dennis on 19.05.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import AppError from '../AppError'
import configureStore from 'redux-mock-store'

function setup(storeData) {
    const mockStore = configureStore();
    const enzymeWrapper = mount(<AppError store={mockStore(storeData)}/>);
    return {
        enzymeWrapper,
        mockStore
    }
}

describe('components', () => {
    describe('AppError', () => {
        it('should not be rendered if there is no error', () => {
            const {enzymeWrapper} = setup({
                errors: []
            });
            const title = enzymeWrapper.find('h4');
            const text = enzymeWrapper.find('li');
            expect(title.length).toBe(0);
            expect(text.length).toBe(0);
            expect(enzymeWrapper.html()).toBe(null);
        });
        it('should render a single Error with correct message, error codde and titel', () => {
            const {enzymeWrapper} = setup({
                errors: [
                    {
                        name: "test error",
                        status: "-100",
                        message: "this error is just a testcase"
                    }
                ]
            });
            const title = enzymeWrapper.find('h4');
            const text = enzymeWrapper.find('li');
            expect(title.length).toBe(1);
            expect(text.length).toBe(1);
            expect(title.text().includes('test error')).toBe(true);
            expect(title.text().includes(-100)).toBe(true);
            expect(text.text().includes('this error is just a testcase')).toBe(true);
        });
        it('should be able to render multiple errors', () => {
            const {enzymeWrapper} = setup({
                errors: [
                    {
                        name: "test_error_1",
                        status: "-200",
                        message: "a testcase error",
                    },
                    {
                        name: "test_error_2",
                        status: "-300",
                        message: "another testcase error"
                    },
                    {
                        name: "test_error_3",
                        status: "-400",
                        message: "final testcase error for this test"
                    }
                ]
            })
        });
    })
})