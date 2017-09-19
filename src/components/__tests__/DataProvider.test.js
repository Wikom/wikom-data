/**
 * Created by dennis on 19.05.17.
 */

import React, {Component} from 'react'
import {mount} from 'enzyme'
import DataProvider from '../DataProvider'
import configureStore from 'redux-mock-store'

function setup(storeData) {
    const mockStore = configureStore()(storeData);
    return {
        mockStore
    }
}

class Dummy extends Component {
    render() {
        return <h1>{this.props.children}</h1>
    }
}

describe('components', () => {
    describe('DataProvider', () => {
        it('should set the dataProps and isLoading props of its children according to the data in the state', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: {test: "test"}}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy>ABC</Dummy>
            </DataProvider>);
            const title = page.find(Dummy);
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual({test: "test"});
            const page2 = mount(<DataProvider store={mockStore} name="testDataProvider" url="">
                <Dummy>ABC</Dummy>
                <Dummy>DEF</Dummy>
                <Dummy>4</Dummy>
            </DataProvider>);

            page2.find(Dummy).forEach((comp) => {
                expect(comp.length).toEqual(1);
                expect(comp.props().hasOwnProperty("isLoading")).toBe(true);
                expect(comp.props().isLoading).toBe(false);
                expect(comp.props().hasOwnProperty("data")).toBe(true);
                expect(comp.props().data).toEqual({test: "test"});
            })
        });
        it('should be able to handle array data types', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: ["A", "B", "C"]}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
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
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
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
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
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
                                             url=""><Dummy>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("myData")).toBe(true);
            expect(title.props().myData).toEqual(["A", "B", "C"]);
        })
        it('should be able to overwrite int data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: 1}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy
                data={2}>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(1);
        })
        it('should be able to overwrite string data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: "bb"}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy
                data="av">ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual("bb");
        })
        it('should be able to overwrite array data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: ["A", "B", "C"]}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy
                data={{d: "e"}}>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual(["A", "B", "C"]);
        })
        it('should be able to overwrite object data', () => {
            const {mockStore} = setup({
                queries: {testDataProvider: {isPending: false}},
                data: {testDataProvider: {a: "b"}}
            });
            const page = mount(<DataProvider store={mockStore} name="testDataProvider" url=""><Dummy
                data={["D", "E", "F"]}>ABC</Dummy>
            </DataProvider>);
            const title = page.find("Dummy");
            expect(title.length).toEqual(1);
            expect(title.props().hasOwnProperty("isLoading")).toBe(true);
            expect(title.props().isLoading).toBe(false);
            expect(title.props().hasOwnProperty("data")).toBe(true);
            expect(title.props().data).toEqual({a: "b"});
        })
    })
})