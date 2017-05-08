import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Component from './index.js'

const expect = chai.expect
chai.use(chaiEnzyme()) // We need to tell chai to use chaiEnzyme

describe ('List ', () => {

    it ('Render with empty message', () => {
        const com = mount(<Component />)
        expect(com.find('.empty')).to.have.lengthOf(1)
    })

    it ('Render Items', () => {
        const com = mount(<Component data={[1, 2]} />)
        expect(com.find('li')).to.have.lengthOf(2)
    })

    it ('Render with Custom Classes', () => {
        const com = mount(<Component classContainer='customContainer' classItem='customItem' data={[1, 2]} />)

        expect(com.find('.customContainer')).to.have.lengthOf(1)
        expect(com.find('.customItem')).to.have.lengthOf(2)
    })

    it ('Render with Pagination', () => {
        const com = mount(<Component pagination data={[1, 2]} />)

        expect(com.find('.pagination')).to.have.lengthOf(2)
        expect(com.find('.pagination li')).to.have.lengthOf(6)
    })

});