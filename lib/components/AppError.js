'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactSymbol = require('react-symbol');

var _reactSymbol2 = _interopRequireDefault(_reactSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by rouven on 29.03.17.
 */

var SingleError = function SingleError(_ref) {
    var error = _ref.error;
    return _react2.default.createElement(
        'div',
        { className: 'alert alert-danger', id: 'page-alert-danger', role: 'alert' },
        _react2.default.createElement(
            'button',
            { type: 'button', className: 'close', 'data-dismiss': 'alert', 'aria-label': 'Close' },
            _react2.default.createElement(_reactSymbol2.default, { symbol: 'times' })
        ),
        _react2.default.createElement(
            'h4',
            null,
            _react2.default.createElement(_reactSymbol2.default, { symbol: { symbol: 'ban', className: 'icon' } }),
            error.status,
            ' ',
            error.name
        ),
        _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
                'li',
                null,
                error.message
            )
        )
    );
};

var AppError = function AppError(_ref2) {
    var errors = _ref2.errors;
    return errors.length > 0 ? _react2.default.createElement(
        'div',
        null,
        errors.map(function (error, i) {
            return _react2.default.createElement(SingleError, { key: i, error: error });
        })
    ) : null;
};

AppError.defaultProps = {
    errors: []
};

AppError.propTypes = {
    errors: _propTypes2.default.arrayOf(_propTypes2.default.object)
};

var mapStateToProps = function mapStateToProps(state, props) {
    return {
        errors: state.errors
    };
};

var AppErrorContainer = (0, _reactRedux.connect)(mapStateToProps)(AppError);

exports.default = AppErrorContainer;