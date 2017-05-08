import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import Component from './index.js'

const expect = chai.expect
chai.use(chaiEnzyme()) // We need to tell chai to use chaiEnzyme

describe ('Radio Group ', () => {

    it ('Render', () => {
        const com = mount(<Component />)
        expect(com).to.be.ok
    })

    it ('Render Items', () => {
        const com = mount(<Component data={[{label: 'a', value: 1}, {label:'b', value:2}]} />)

        expect(com.find('.btn-sm')).to.have.lengthOf(2)
        expect(com.find('.btn-group')).to.have.lengthOf(1)
    })

    it ('Render Items with Custom Classes', () => {
        const com = mount(<Component 
                            containerClass='customContainer' 
                            className='customItem' 
                            data={[{label: 'a', value: 1}, {label:'b', value:2}]} 
                          />)

        expect(com.find('.customContainer')).to.have.lengthOf(1)
        expect(com.find('.customItem')).to.have.lengthOf(2)
    })

    it ('Render Items with onChange Event', () => {
        const onChange = sinon.spy()
        const com = mount(<Component onChange={onChange} data={[{label: 'a', value: 1}, {label:'b', value:2}]} />)

        com.find('.btn-sm').last().simulate('click')
        
        expect(onChange.callCount).to.be.eql(1)
    })

});