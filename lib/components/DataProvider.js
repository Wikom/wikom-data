'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactLoading = require('react-loading');

var _reactLoading2 = _interopRequireDefault(_reactLoading);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by rouven on 15.03.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DataProvider = function (_Component) {
    _inherits(DataProvider, _Component);

    function DataProvider() {
        _classCallCheck(this, DataProvider);

        return _possibleConstructorReturn(this, (DataProvider.__proto__ || Object.getPrototypeOf(DataProvider)).apply(this, arguments));
    }

    _createClass(DataProvider, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.force) {
                this._pendingFetch = this.props.loadData({ name: this.props.name, url: this.props.url });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.force && this.props.url !== nextProps.url || nextProps.refresh === true) {
                if (this._pendingFetch) {
                    this._pendingFetch.cancel();
                }
                this.props.clearData({ name: this.props.name });
                this._pendingFetch = this.props.loadData({ name: nextProps.name, url: nextProps.url });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._pendingFetch && this._pendingFetch.cancel();
            if (this.props.force) {
                this.props.clearData({ name: this.props.name });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.onlyLoaded && this.props.isLoading ? _react2.default.createElement(
                'span',
                null,
                this.props.loading
            ) : _react2.default.createElement(
                'span',
                null,
                this.props.children
            );
        }
    }]);

    return DataProvider;
}(_react.Component);

/**
 * accepts assoc objects and arrays, returns type of data
 * @param data
 * @param prependData
 * @param appendData
 */


var mergeData = function mergeData(data) {
    var prependData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var appendData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) != "object" || (typeof prependData === 'undefined' ? 'undefined' : _typeof(prependData)) != "object" || (typeof appendData === 'undefined' ? 'undefined' : _typeof(appendData)) != "object") return data;

    if (Array.isArray(data)) {
        prependData = Array.isArray(prependData) ? prependData : [];
        appendData = Array.isArray(appendData) ? appendData : [];

        return prependData.concat(data, appendData);
    }

    return Object.assign({}, prependData, data, appendData);
};

/**
 *
 * @param Child
 * @param state
 * @param dataProp
 * @param isLoadingProp
 * @param name
 * @param dataMap
 * @param prependData
 * @param appendData
 * @param rest
 * @return {*}
 */
var mapChildren = function mapChildren(Child, state, dataProp, isLoadingProp, name, dataMap, prependData, appendData, rest) {
    var _extends2;

    var storeData = state.data && state.data[name] || [];
    var isLoading = !state.queries[name] || state.queries[name].isPending === true;

    var data = typeof dataMap == 'function' && storeData instanceof Array ? storeData.map(dataMap) : storeData;
    data = mergeData(data, prependData, appendData);

    return _react2.default.cloneElement(Child, _extends((_extends2 = {}, _defineProperty(_extends2, isLoadingProp, isLoading), _defineProperty(_extends2, dataProp, isLoading ? null : data), _defineProperty(_extends2, 'pagination', state.data && state.data.pagination && state.data.pagination[name] || null), _extends2), rest));
};

var mapStateToProps = function mapStateToProps(state, _ref) {
    var children = _ref.children,
        name = _ref.name,
        url = _ref.url,
        force = _ref.force,
        dataProp = _ref.dataProp,
        isLoadingProp = _ref.isLoadingProp,
        refresh = _ref.refresh,
        dataMap = _ref.dataMap,
        prependData = _ref.prependData,
        appendData = _ref.appendData,
        rest = _objectWithoutProperties(_ref, ['children', 'name', 'url', 'force', 'dataProp', 'isLoadingProp', 'refresh', 'dataMap', 'prependData', 'appendData']);

    return {
        isLoading: !state.queries[name] || state.queries[name].isPending === true,
        refresh: refresh || state.queries[name] && state.queries[name].isQueued === true,
        force: force || !state.queries[name] || state.queries[name].isComplete === false,
        children: _react2.default.Children.map(children, function (Child) {
            return mapChildren(Child, state, dataProp, isLoadingProp, name, dataMap, prependData, appendData, rest);
        })
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        loadData: function loadData(_ref2) {
            var name = _ref2.name,
                url = _ref2.url;
            return dispatch((0, _actions.loadData)({ name: name, url: url }));
        },
        clearData: function clearData(_ref3) {
            var name = _ref3.name;
            return dispatch((0, _actions.clearData)({ name: name }));
        }
    };
};

var DataProviderContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DataProvider);

DataProviderContainer.defaultProps = {
    dataProp: 'data',
    isLoadingProp: 'isLoading',
    loading: _react2.default.createElement(_reactLoading2.default, null),
    force: false,
    refresh: false,
    onlyLoaded: false,
    dataMap: null
};

DataProviderContainer.propTypes = {
    name: _propTypes2.default.string.isRequired,
    url: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node.isRequired,
    dataProp: _propTypes2.default.string,
    isLoadingProp: _propTypes2.default.string,
    force: _propTypes2.default.bool,
    refresh: _propTypes2.default.bool,
    onlyLoaded: _propTypes2.default.bool,
    dataMap: _propTypes2.default.func
};

exports.default = DataProviderContainer;