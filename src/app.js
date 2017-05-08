import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from 'components/button'
import DropDown from 'components/dropdown'
import RadioGroup from 'components/radiogroup'
import ListRoutes from 'components/listroutes'
import utils from 'libs/utils'
import './app.css'

class App extends Component {
    constructor (props) {
        super(props)
        const data = utils.getJSON()

        this.state = {
            sourceCities: [],
            sourceOrderby: [utils.ORDER_BY.COST, utils.ORDER_BY.DURATION],
            from: '',
            to: '',
            orderby: utils.ORDER_BY.COST.value,
            routes: [],
            json: data,
            sourceCities: data.cities
        }

        this.changeField = this.changeField.bind(this)
        this.search = this.search.bind(this)
    }

    changeField (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    search () {
        let error = false
        const msgError = []
        const fields = ['from', 'to']

        fields.forEach((field) => {
            if (this.state[field] === '') {
                ReactDOM.findDOMNode(this[field]).focus()
                msgError.push(`Please select ${field.toUpperCase()}`)
                error = true
            }
        })

        if (!error && this.state.from === this.state.to) {
            error = true
            msgError.push('You are already here, please choose another destination!')
        }

        if (!error) {
            this.setState({
                routes: utils.getRoutes(
                    this.state.json.deals,
                    this.state.from,
                    this.state.to,
                    this.state.orderby
                ),
                error: []
            })
        } else {
            this.setState({
                error: msgError
            })
        }
    }

    render () {
        return (
            <div className='container'>
                <div className='row'>
                    <h1>TripSorter</h1>
                </div>
                <div className='row'>
                    <div className='search panel panel-default col-lg-4 col-xs-12'>
                        <div className='row'>
                            <DropDown
                              data={this.state.sourceCities}
                              ref={(ctrl) => { this.from = ctrl }}
                              name='from'
                              className='form-control'
                              placeholder='From'
                              onChange={this.changeField}
                            />
                        </div>
                        <div className='row'>
                            <DropDown
                              data={this.state.sourceCities}
                              ref={(ctrl) => { this.to = ctrl }}
                              name='to'
                              className='form-control'
                              placeholder='To'
                              onChange={this.changeField}
                            />
                        </div>
                        <div className='row'>
                            <RadioGroup
                              data={this.state.sourceOrderby}
                              name='orderby'
                              className='form-control'
                              onChange={this.changeField}
                            />
                        </div>
                        <div className='row'>
                            <Button className='btn-green' onClick={this.search}>
                                <i className='glyphicon glyphicon-search' /> Search
                            </Button>
                            <div className='error-container'>
                                {
                                this.state.error && this.state.error.map(err => <span>{err}</span>)
                            }
                            </div>
                        </div>
                    </div>
                    <div className='list-container panel panel-success col-lg-offset-1 col-lg-7 col-xs-12'>
                        <ListRoutes data={this.state.routes} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
