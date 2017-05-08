import React, { Component, PropTypes } from 'react';
import './style.css'

class Pagination extends Component {
    constructor (props) {
        super(props)
        this.state = this.buildState(this.props)
    }

    componentWillReceiveProps (nextProps) {
        if (
            nextProps.total !== this.props.total ||
            nextProps.paginationSize !== this.props.paginationSize ||
            nextProps.curPage !== this.state.curPage
        ) {
            this.setState(this.buildState(nextProps))
        }
    }

    buildState (props) {
        return {
            pages: Math.ceil(props.total / props.itemsPage),
            curPage: props.curPage >= 0 ? props.curPage : (this.state && this.state.curPage) || 0,
            paginationSize: props.paginationSize
        }
    }

    onPageChange (e, page) {
        if (this.props.onPageChange) {
            this.props.onPageChange(e, page)
        }
        this.setState({
            curPage: page
        })
    }

    onBack (e) {
        const page = this.state.curPage > 0 ? this.state.curPage - 1 : this.state.curPage

        if (page !== this.state.curPage) {
            this.props.onNext && this.props.onBack(e, page)
            this.props.onPageChange && this.props.onPageChange(e, page)
            this.setState({
                curPage: page
            })
        }
    }

    onNext (e) {
        const page = this.state.curPage < this.state.pages - 1 ? this.state.curPage + 1 : this.state.curPage

        if (page !== this.state.curPage) {

            this.props.onNext && this.props.onNext(e, this.state.curPage + 1)
            this.props.onPageChange && this.props.onPageChange(e, this.state.curPage + 1)
            this.setState({
                curPage: this.state.curPage + 1
            })
        }
    }

    getPages () {
        const result = []
        const { pages, curPage, paginationSize } = this.state
        let endPage = pages - 1
        if (endPage <= 0) return [0]
        let startPage = Math.max(curPage - Math.floor(paginationSize / 2), 0)
        endPage = (startPage + paginationSize) - 1

        if (endPage > pages - 1) {
            endPage = pages - 1
            startPage = (endPage - paginationSize) + 1
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i >= 0) result.push(i)
        }

        return result
    }

    render () {
        return (<div>
            <ul className='pagination'>
                {
                    this.state.pages > 0 ? [
                        <li key='back' className='back' onClick={e => this.onBack(e)}><span><i className='glyphicon glyphicon-menu-left' /></span></li>,
                        this.getPages().map((page) => {
                            const active = page === this.state.curPage ? 'active' : ''
                            return <li key={page} className={active} onClick={e => this.onPageChange(e, page)}><span>{page + 1}</span></li>
                        }),
                        <li key='next' className='next' onClick={e => this.onNext(e)}><span><i className='glyphicon glyphicon-menu-right' /></span></li>
                    ] : null
                }
            </ul>
            <p>{this.state.pages > 0 && `Page ${this.state && this.state.curPage + 1} of ${this.state.pages}  -  Total Record(s) ${this.props.total}`}</p>
        </div>
        );
    }
}

Pagination.propTypes = {
    total: PropTypes.number,
    paginationSize: PropTypes.number,
    itemsPage: PropTypes.number,
    curPage: PropTypes.number, //Should be providede from 0
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    onPageChange: PropTypes.func
};

Pagination.defaultProps = {
    paginationSize: 5,
    total: 0,
    itemsPage: 10
}

export default Pagination
