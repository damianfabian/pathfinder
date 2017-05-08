import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'
import './style.css'

class RadioGroup extends Component {
    constructor (props) {
        super(props)

        this.state = {
            value: this.props.data[0].value || ''
        }

        this.click = this.click.bind(this)
    }

    click (e) {
        const newValue = e.target.attributes['data-value'].value
        this.setState({
            value: newValue
        })
        this.props.onChange({
            target: {
                value: newValue,
                name: this.props.name
            }
        })
    }

    render () {
        return (
            <div className={classnames('radiogroup', this.props.containerClass)}>
                <div className='input-group'>
                    <div className='btn-group'>
                        {
                            this.props.data.map((el) => {
                                const classes = classnames(
                                    'btn btn-primary btn-sm',
                                    { 'active': this.state.value === el.value },
                                    this.props.className
                                )
                                return (<a className={classes} onClick={this.click} data-value={el.value}>
                                    {el.label}
                                </a>)
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

RadioGroup.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    containerClass: PropTypes.string
}

RadioGroup.defaultProps = {
    data: ['']
}

export default RadioGroup
