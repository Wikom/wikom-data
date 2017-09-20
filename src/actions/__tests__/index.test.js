import * as actions from '../';
import * as actionTypes from '../actionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'

import { saveAs } from 'file-saver'

jest.mock('file-saver', () => ({
  saveAs: jest.fn()
}))


describe('setUser', () => {
    test('should return an user action', () => {
        const userName = 'test user';
        const user = {user: userName};
        const desiredAction = {
            type: actionTypes.SET_USER,
            user: userName
        };
        expect(actions.setUser(user)).toMatchObject(desiredAction);
    });
});

describe('get', () => {
    test('should generate a get request', () => {
        const args = {url: 'https://localhost/endpoint'}
        const request = actions.get(args);
        expect(request).toMatchObject({
            url: "https://localhost/endpoint",
            method: "GET"
        });
    });
});

describe('post', () => {
    test('should generate a post request', () => {
        const args = {url: 'https://localhost/endpoint'}
        const request = actions.post(args);
        expect(request).toMatchObject({
            url: "https://localhost/endpoint",
            method: "POST"
        });
    });
});

describe('del', () => {
    test('should generate a del request', () => {
        const args = {url: 'https://localhost/endpoint'}
        const request = actions.del(args);
        expect(request).toMatchObject({
            url: "https://localhost/endpoint",
            method: "DELETE"
        });
    });
});

describe('put', () => {
    test('should generate a put request', () => {
        const args = {url: 'https://localhost/endpoint'}
        const request = actions.put(args);
        expect(request).toMatchObject({
            url: "https://localhost/endpoint",
            method: "PUT"
        });
    });
});

describe('loadDataPending', () => {
    test('should return a pending action', () => {
        const args = {name:'name', url:'https://localhost/endpoint'};
        const desiredAction = {
            type: actionTypes.LOAD_DATA_PENDING,
            name: args.name,
            url: args.url
        };
        expect(actions.loadDataPending(args)).toMatchObject(desiredAction);
    });
});

describe('loadDataSuccess', () => {
    test('should return a success action', () => {
        const args = {name:'name', url:'https://localhost/endpoint', data: {a1: 'test'}};
        const desiredAction = {
            type: actionTypes.LOAD_DATA_SUCCESS,
            name: args.name,
            url: args.url,
            data: args.data
        };
        expect(actions.loadDataSuccess(args)).toMatchObject(desiredAction);
    });
});

describe('loadDataFailure', () => {
    test('should return a failure action', () => {
        const args = {name:'name', url:'https://localhost/endpoint', error: {a1: 'test'}};
        const desiredAction = {
            type: actionTypes.LOAD_DATA_FAILURE,
            name: args.name,
            url: args.url,
            error: args.error
        };
        expect(actions.loadDataFailure(args)).toMatchObject(desiredAction);
    });
});

describe('loadDataCancel', () => {
    test('should return a failure action', () => {
        const args = {name:'name', url:'https://localhost/endpoint'};
        const desiredAction = {
            type: actionTypes.LOAD_DATA_CANCEL,
            name: args.name,
            url: args.url,
        };
        expect(actions.loadDataCancel(args)).toMatchObject(desiredAction);
    });
});

describe('loadDataProgress', () => {
    test('should return a failure action', () => {
        const args = {name:'name', url:'https://localhost/endpoint', percent: 50};
        const desiredAction = {
            type: actionTypes.LOAD_DATA_PROGRESS,
            name: args.name,
            url: args.url,
            percent: args.percent
        };
        expect(actions.loadDataProgress(args)).toMatchObject(desiredAction);
    });
});

describe('clearData', () => {
    test('should return a failure action', () => {
        const args = {name:'name'};
        const desiredAction = {
            type: actionTypes.CLEAR_DATA,
            name: args.name,
        };
        expect(actions.clearData(args)).toMatchObject(desiredAction);
    });
});

describe('refreshData', () => {
    test('should return a failure action', () => {
        const args = {name:'name'};
        const desiredAction = {
            type: actionTypes.REFRESH_DATA,
            name: args.name,
        };
        expect(actions.refreshData(args)).toMatchObject(desiredAction);
    });
});

describe('setPagination', () => {
    test('should return a failure action', () => {
        const args = {name:'name', data:{page:1}};
        const desiredAction = {
            type: actionTypes.SET_PAGINATION,
            name: args.name,
            data: args.data,
        };
        expect(actions.setPagination(args)).toMatchObject(desiredAction);
    });
});


describe('clearPagination', () => {
    test('should return a failure action', () => {
        const args = {name:'name'};
        const desiredAction = {
            type: actionTypes.CLEAR_PAGINATION,
            name: args.name,
        };
        expect(actions.clearPagination(args)).toMatchObject(desiredAction);
    });
});

describe('async actions', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)

    afterEach(() => {
        nock.cleanAll()
    })

    describe('loadData', () => {
        test('should get data from server', () => {
            const expectedActions = [
                {
                    "name": "name",
                    "type": "@@wikom-data/LOAD_DATA_PENDING",
                    "url": "https://localhost/endpoint"
                }, 
                {
                    "data": {test1: "xyz", test2: "abc"}, 
                    "name": "name", 
                    "type": "@@wikom-data/LOAD_DATA_SUCCESS", 
                    "url": "https://localhost/endpoint"
                }
            ]
            const store = mockStore({queries: []})
            const args = {name:'name', url:'https://localhost/endpoint'};

            nock('https://localhost/')
                .get('/endpoint')
                .reply(200, {data: {test1: 'xyz', test2: 'abc'}})

            return store.dispatch(actions.loadData(args)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
        test('should handle server errors', () => {
            const expectedActions = [
                {
                    "name": "name",
                    "type": "@@wikom-data/LOAD_DATA_PENDING",
                    "url": "https://localhost/endpoint"
                }, 
                {
                    "error": Error('Forbidden'), 
                    "name": "name", 
                    "type": "@@wikom-data/LOAD_DATA_FAILURE", 
                    "url": "https://localhost/endpoint"
                }, 
                {
                    "name": "name", 
                    "type": "@@wikom-data/CLEAR_PAGINATION"
                }
            ]
            const store = mockStore({queries: []})
            const args = {name:'name', url:'https://localhost/endpoint'};

            nock('https://localhost/')
                .get('/endpoint')
                .reply(403, {data: {test1: 'xyz', test2: 'abc'}})

            return store.dispatch(actions.loadData(args)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

    })

    describe('download', () => {
        test('should download file from from server', () => {
            //const saveAs = jest.fn().mockImplementation((blob, name, no_auto_bom) => true)

            const expectedActions = [
                {
                    "name": "name", 
                    "type": "@@wikom-data/LOAD_DATA_PENDING", 
                    "url": "https://localhost/fileonserver"
                }, 
                {
                    "data": null, 
                    "name": "name", 
                    "type": "@@wikom-data/LOAD_DATA_SUCCESS", 
                    "url": "https://localhost/fileonserver"
                }
            ]
            const store = mockStore({queries: []})
            const args = {name:'name', url:'https://localhost/fileonserver'};

            nock('https://localhost/')
                .get('/fileonserver')
                .replyWithFile(200, __dirname + '/replies/user.json', { 'Content-Type': 'application/json' });

            return store.dispatch(actions.download(args)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
        test('should handle server errors', () => {
            const expectedActions = [
                {
                    "name": "name",
                    "type": "@@wikom-data/LOAD_DATA_PENDING", 
                    "url": "https://localhost/fileonserver"
                }, 
                {
                    "error": Error('Forbidden'), 
                    "name": "name", 
                    "type": "@@wikom-data/LOAD_DATA_FAILURE", 
                    "url": "https://localhost/fileonserver"
                }, 
                {
                    "name": "name", 
                    "type": "@@wikom-data/CLEAR_PAGINATION"
                }
            ]

            const store = mockStore({queries: []})
            const args = {name:'name', url:'https://localhost/fileonserver'};

            nock('https://localhost/')
                .get('/fileonserver')
                .replyWithFile(403, __dirname + '/replies/user.json', { 'Content-Type': 'application/json' });

            return store.dispatch(actions.loadData(args)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })

    // describe('submit', () => {
    //     test('submit data to an endpoint with put if primary key is set', () => {
    //         const store = mockStore({queries: []})
    //         const args = {url:'https://localhost/endpoint', data: {id:1234}}
    //         // jest.mock('../index', () => ({
    //         //     put: jest.fn(),
    //         //     post: jest.fn()
    //         // }));
    //         // actions.put = jest.fn()
    //         // console.log(actions)
    //         nock('https://localhost/')
    //             .put('/endpoint/1234')
    //             .reply(200, {data: {test1: 'xyz', test2: 'abc'}})
    //         const request = actions.submit(args)
    //         console.log()

    //     })

    // })
})
