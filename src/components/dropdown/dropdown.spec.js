import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import Component from './index.js'

const expect = chai.expect
chai.use(chaiEnzyme()) // We need to tell chai to use chaiEnzyme

describe ('Dropdown ', () => {

    it ('Render', () => {
        const com = mount(<Component />)
        expect(com).to.be.ok
    })

    it ('Render with placeholder', () => {
        const com = mount(<Component placeholder='Custom' />)
        expect(com.find('option')).to.have.text('Custom')
    })

    it ('Render with Cusmtom Class', () => {
        const com = mount(<Component className='Custom' />)
        expect(com.find('.Custom')).to.have.lengthOf(1)
    })

    it ('Render with onChange Event', () => {
        const onChange = sinon.spy()
        const com = mount(<Component onChange={onChange} />)

        com.find('select').simulate('change', { taget: { value: '2' } })

        expect(onChange.callCount).to.be.eql(1)
    })

});