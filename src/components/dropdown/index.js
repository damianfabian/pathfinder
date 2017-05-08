import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'

class DropDown extends Component {
    render () {
        return (
            <select
              className={classnames('dropdown', this.props.className)}
              name={this.props.name}
              onChange={this.props.onChange}
            >
                <option value=''>{this.props.placeholder}</option>
                {
                    this.props.data && this.props.data.map(el => <option value={el.value} key={el.value}>{el.label}</option>)
                }
            </select>
        )
    }
}

DropDown.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

DropDown.defaultProps = {
    placeholder: 'Select one'
}

export default DropDown
