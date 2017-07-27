/**
 * Created by rouven on 29.03.17.
 */
/**
 * @class AppError
 * @classdesc  This is the main component for the graphical errors shown as soon as a javascript error occurs.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Symbol from 'react-symbol'


const SingleError = ({error}) =>
    <div className="alert alert-danger" id="page-alert-danger" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <Symbol symbol="times"/>
        </button>
        <h4>
            <Symbol symbol={{symbol: 'ban', className: 'icon'}}/>
            {error.status} {error.name}
        </h4>
        <ul>
            <li>{error.message}</li>
        </ul>
    </div>;

/**
 * Constructs an AppError UI widget, that shows errors stored in the store.
 * @param errors {array} the errors to be displayed
 * @constructor
 */
const AppError = ({errors}) => errors.length > 0
    ? <div>{errors.map((error, i) => <SingleError key={i} error={error}/>)}</div>
    : null;

AppError.defaultProps = {
    errors: []
};

AppError.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state, props) => ({
    errors: state.errors
});

const AppErrorContainer = connect(mapStateToProps)(AppError);

export default AppErrorContainer;