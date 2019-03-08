/**
 * Created by rouven on 20.03.17.
 */

import DataProvider from './components/DataProvider';
import AppError from './components/AppError';
import * as actionTypes from './actions/actionTypes';
import * as actions from './actions';
import ajaxErrorMiddleware from './middleware/ajaxErrorMiddleware';
import dataReducer from './reducers/dataReducer';
import queriesReducer from './reducers/queriesReducer';
import errorReducer from './reducers/errorReducer';
import userReducer from './reducers/userReducer';

const {loadData, download, submit, setUser, configureRequest, clearData, refreshData, confirmAndDelete, directDelete, upload} = actions;

export default DataProvider;
export {
    DataProvider,
    AppError,
    actionTypes,
    ajaxErrorMiddleware,
    dataReducer,
    queriesReducer,
    errorReducer,
    userReducer,
    actions,
    loadData,
    download,
    submit,
    setUser,
    configureRequest,
    clearData,
    refreshData,
    confirmAndDelete,
    directDelete,
    upload
};