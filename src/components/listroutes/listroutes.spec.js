import React from 'react'
import { mount } from 'enzyme'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Component from './index.js'

const expect = chai.expect
chai.use(chaiEnzyme()) // We need to tell chai to use chaiEnzyme

describe ('List Route ', () => {

    it ('Render', () => {
        const com = mount(<Component />)
        expect(com).to.be.ok
    });

    it ('Render Items', () => {
        const com = mount(<Component data={[
            {
                a:1, 
                nodes: [
                    {destination: 'a'},
                    {destination: 'a'}
                ]
            },
            {
                a:1, 
                nodes: [
                    {destination: 'a'},
                    {destination: 'a'}
                ]
            }
        ]} />)

        expect(com.find('.route')).to.have.lengthOf(2)
        expect(com.find('.buy')).to.have.lengthOf(2)
        expect(com.find('.price').length).to.be.greaterThan(1)
    });

});