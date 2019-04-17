"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _reactLoading = _interopRequireDefault(require("react-loading"));

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This is the main component.  It is responsible for loading the data into its children (passing it via props),also it handles the loading bar.
 * It is not responsible for loading the data into the state, nor is it responsiblefor updating the data in the state, although it might call the
 * loadData action responsible for loading data.
 */
var DataProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(DataProvider, _Component);

  function DataProvider() {
    _classCallCheck(this, DataProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(DataProvider).apply(this, arguments));
  }

  _createClass(DataProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.force) {
        this._pendingFetch = this.props.loadData({
          name: this.props.name,
          url: this.props.url
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.force && this.props.url !== nextProps.url || nextProps.refresh === true) {
        if (this._pendingFetch) {
          this._pendingFetch.cancel();
        }

        this.props.clearData({
          name: this.props.name
        });
        this._pendingFetch = this.props.loadData({
          name: nextProps.name,
          url: nextProps.url
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._pendingFetch && this._pendingFetch.cancel();

      if (this.props.force) {
        this.props.clearData({
          name: this.props.name
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.onlyLoaded && this.props.isLoading ? _react["default"].createElement("span", null, this.props.loading) : _react["default"].createElement("span", null, this.props.children);
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
  if (_typeof(data) != "object" || _typeof(prependData) != "object" || _typeof(appendData) != "object") return data;

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
  var _objectSpread2;

  var storeData = state.data && state.data[name] || [];
  var isLoading = !state.queries[name] || state.queries[name].isPending === true;
  var data = typeof dataMap == 'function' && storeData instanceof Array ? storeData.map(dataMap) : storeData;
  data = mergeData(data, prependData, appendData);
  return _react["default"].cloneElement(Child, _objectSpread((_objectSpread2 = {}, _defineProperty(_objectSpread2, isLoadingProp, isLoading), _defineProperty(_objectSpread2, dataProp, isLoading ? null : data), _defineProperty(_objectSpread2, "pagination", state.data && state.data.pagination && state.data.pagination[name] || null), _objectSpread2), rest));
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
      rest = _objectWithoutProperties(_ref, ["children", "name", "url", "force", "dataProp", "isLoadingProp", "refresh", "dataMap", "prependData", "appendData"]);

  return {
    isLoading: !state.queries[name] || state.queries[name].isPending === true,
    refresh: refresh || state.queries[name] && state.queries[name].isQueued === true,
    force: force || !state.queries[name] || state.queries[name].isComplete === false,
    children: _react["default"].Children.map(children, function (Child) {
      return mapChildren(Child, state, dataProp, isLoadingProp, name, dataMap, prependData, appendData, rest);
    })
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadData: function loadData(_ref2) {
      var name = _ref2.name,
          url = _ref2.url;
      return dispatch((0, _actions.loadData)({
        name: name,
        url: url
      }));
    },
    clearData: function clearData(_ref3) {
      var name = _ref3.name;
      return dispatch((0, _actions.clearData)({
        name: name
      }));
    }
  };
};

var DataProviderContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DataProvider);
DataProviderContainer.defaultProps = {
  dataProp: 'data',
  isLoadingProp: 'isLoading',
  loading: _react["default"].createElement(_reactLoading["default"], null),
  force: false,
  refresh: false,
  onlyLoaded: false,
  dataMap: null
};
DataProviderContainer.propTypes = {
  name: _propTypes["default"].string.isRequired,
  url: _propTypes["default"].string.isRequired,
  children: _propTypes["default"].node,
  dataProp: _propTypes["default"].string,
  isLoadingProp: _propTypes["default"].string,
  force: _propTypes["default"].bool,
  refresh: _propTypes["default"].bool,
  onlyLoaded: _propTypes["default"].bool,
  dataMap: _propTypes["default"].func
};
var _default = DataProviderContainer;
exports["default"] = _default;