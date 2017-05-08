import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import sinon from 'sinon'
import chaiEnzyme from 'chai-enzyme'
import Component from './index.js'

const expect = chai.expect
chai.use(chaiEnzyme()) // We need to tell chai to use chaiEnzyme

describe ('Button ', () => {

    it ('Render', () => {
        const com = mount(<Component />)
        expect(com).to.be.ok
    })

    it ('Render with custom classes', () => {
        const com = mount(<Component className='custom' />)
        expect(com.find('button.custom')).to.have.lengthOf(1)
    })

    it ('Render with Click Event', () => {
        const onClick = sinon.spy()
        const com = mount(<Component className='custom' onClick={onClick} />)

        com.find('button.custom').simulate('click')
        expect(onClick.callCount).to.be.eql(1)
    })

});