/**
 * Created by dennis on 19.05.17.
 */

import React from 'react'
import {mount} from 'enzyme'
import DataProvider from '../DataProvider'
import configureStore from 'redux-mock-store'

function setup(storeData) {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
}

describe('components', () => {
    describe('DataProvider', () => {
        it('should set the dataProps and isLoading props of its children according to the data in the state', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: {test: "test"}}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual({test: "test"});
            const page2 = mount(<DataProvider store={mockStore} name="testDataProvider" url="">
                <h1>ABC</h1>
                <h2>DEF</h2>
                <div>4</div>
            </DataProvider>);
            const title1 = page2.find("h1");
            expect(title1.length).toEqual(1);
            expect(title1.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title1.props().isLoading).toBe(false);
            expect(title1.props().hasOwnProperty("data")).toBe(true);
            expect(title1.props().data).toEqual({test: "test"});
            const title2 = page2.find("h2");
            expect(title2.length).toEqual(1);
            expect(title2.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title2.props().isLoading).toBe(false);
            expect(title2.props().hasOwnProperty("data")).toBe(true);
            expect(title2.props().data).toEqual({test: "test"});
            const div = page2.find("div");
            expect(div.length).toEqual(1);
            expect(div.props().hasOwnProperty("isLoading")).toBe(true);
            expect(div.props().isLoading).toBe(false);
            expect(div.props().hasOwnProperty("data")).toBe(true);
            expect(div.props().data).toEqual({test: "test"});
        });
        it('should be able to handle array data types', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: ["A", "B", "C"]}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(["A", "B", "C"]);
        })
        it('should be able to hande strings', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: "abc"}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual("abc");

        })
        it('should be able to handle ints', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: 123}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(123);
        })
        it('should be able to save data to a given prop', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: ["A", "B", "C"]}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" dataProp="myData"
                                             url=""><h1>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("myData")).toBe(true);
            expect(title.props().myData).toEqual(["A", "B", "C"]);
        })
        it('should be able to merge array data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: ["A", "B", "C"]}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1
                data={["D", "E", "F"]}>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(["D", "E", "F", "A", "B", "C"]);
        })
        it('should be able to merge object data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: {test: "123"}}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1
                data={{test2: 456}}>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual({test: "123", test2: 456});
        })
        it('should be able to overwrite int data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: 1}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1
                data={2}>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(2);
        })
        it('should be able to overwrite string data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: "bb"}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1
                data="av">ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual("av");
        })
        it('should be able to overwrite array data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: ["A", "B", "C"]}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1
                data={{d: "e"}}>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual({d: "e"});
        })
        it('should be able to overwrite object data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: {a: "b"}}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><h1
                data={["D", "E", "F"]}>ABC</h1>
            </DataProvider>);
            const title = page.find("h1");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(["D", "E", "F"]);
        })
    })
})