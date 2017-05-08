import React, { Component, PropTypes } from 'react';
import List from 'components/list'
import utils from 'libs/utils'
import Button from 'components/button'

class ListGroup extends Component {
    constructor (props) {
        super(props)

        this.renderItem = this.renderItem.bind(this)
    }

    renderItem (i, el) {
        if (!el.nodes) return false;

        let total = 0
        let duration = 0
        const steps = el.nodes.map((step) => {
            total += step.cost
            duration += step.duration
            return (<li className='step list-group-item' key={step.reference}>
                <p className='destination'>
                    {step.departure} <i className='fa fa-chevron-circle-right' /> {step.arrival} <span className='price'>{step.cost}€</span>
                </p>
                <span className='info'>
                    <i className={`fa fa-${step.transport}`} /> {step.reference} for {utils.parseTime(step.duration)}
                    <i className='glyphicon glyphicon-time' />
                </span>
            </li>)
        })

        return (<div className='route'>
            <ul className='sumarize list-group'>
                <li className='list-group-item title'>Stops</li>
                <li className='list-group-item'>{el.nodes.length}</li>
                <li className='list-group-item title'>Time</li>
                <li className='list-group-item'>{utils.parseTime(duration)}</li>
                <li className='list-group-item title'>Total Price</li>
                <li className='list-group-item'>{total}€</li>
                <li className='list-group-item'>
                    <Button className='btn-danger buy' onClick={() => this.buy(el.reference)}>Buy Now!</Button>
                </li>
            </ul>
            <ul className='steps-container list-group'>
                { steps }
            </ul>
            <div className='clearfix' />
        </div>)
    }
    render () {
        return (<List
          data={this.props.data}
          renderItem={this.renderItem}
          classContainer='listRoute'
          classItem='itemRoute'
          emptyText='Where do we go today?'
          pagination
        />)
    }
}

ListGroup.propTypes = {
    data: PropTypes.array.isRequired
}

export default ListGroup
