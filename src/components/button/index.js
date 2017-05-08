import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'

class Button extends Component {
    render () {
        return (
            <button className={classnames('btn', this.props.className)} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

Button.propTypes = {
    children: PropTypes.any.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
}

Button.defaultProps = {
    className: 'btn-primary'
}

export default Button
