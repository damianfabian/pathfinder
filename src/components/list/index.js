import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Pagination from 'components/pagination'

class List extends Component {
    constructor (props) {
        super(props)

        this.changePage = this.changePage.bind(this)
        this.state = this.buildState(props, 0)
    }

    componentWillReceiveProps (nextProps) {
        this.setState(this.buildState(nextProps, 0))
    }

    buildState (props, page) {
        const start = page * props.paginationSize
        const end = start + props.paginationSize
        return {
            source: props.data.slice(start, end),
            curPage: page
        }
    }

    changePage (e, newPage) {
        this.setState(this.buildState(this.props, newPage))
    }

    renderItem (i, el, itemClass) {
        return <li className={itemClass} key={el}>{el}</li>
    }

    render () {
        const _render = this.props.renderItem || this.renderItem
        const empty = this.state.source.length === 0
        const _pagination = <Pagination total={this.props.data.length} curPage={this.state.curPage} onPageChange={this.changePage} paginationSize={this.props.paginationSize} />
        const _html = empty ? (<div className='empty'>
            <i className='glyphicon glyphicon-info-sign' /> {this.props.emptyText}
        </div>) :
            (
                this.state.source.map((el, i) => {
                    return _render(i, el, this.props.classItem)
                })
            )
        return (
            <div className={classnames('list', this.props.classContainer)}>
                {this.props.pagination && _pagination}
                {
                    _html
                }
                {this.props.pagination && _pagination}
            </div>
        );
    }
}

List.propTypes = {
    data: PropTypes.array.isRequired,
    classContainer: PropTypes.string,
    classItem: PropTypes.string,
    emptyText: PropTypes.string,
    pagination: PropTypes.bool,
    paginationSize: PropTypes.number,
    renderItem: PropTypes.func
}

List.defaultProps = {
    classContainer: 'list-container',
    classItem: 'item-list',
    emptyText: 'Not Results',
    paginationSize: 10,
    data: []
}

export default List
