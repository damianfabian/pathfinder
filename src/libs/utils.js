import db from './response.json'

const CACHE_CITY_INFO = {}

const ORDER_BY = {
    COST: {
        value: 'cost',
        label: 'Cheapest'
    },
    DURATION: {
        value: 'duration',
        label: 'Fastest'
    }
}

function getJSON () {
    return {
        deals: db.deals,
        cities: _getCities(db.deals)
    }
}

function _getCities (source) {
    const _temp = source.reduce((acc, route) => {
        if (!acc[route.departure]) acc[route.departure] = { value: route.departure, label: route.departure }
        return acc
    }, {})
    return Object.keys(_temp).map(i => _temp[i])
}

function _getRankRoute (info, orderby) {
    switch (orderby) {
    case ORDER_BY.COST.value: {
        const rank = info.cost - info.duration
        return rank > 0 ? rank : info.cost
    }
    case ORDER_BY.DURATION.value: {
        return (parseInt(info.duration.h) * 60) + parseInt(info.duration.m)
    }
    }
}

function parseTime (duration) {
    const h = Math.floor(duration / 60)
    const m = duration % 60
    return `${h}H ${m}M`
}

function _deepClone (obj) {
    return JSON.parse(JSON.stringify(obj))
}

function renderRoutes (source, routes, orderby) {
    if (!source || !routes || !orderby) return "renderRoutes required 4 params, please check";

    const _output = []
    const _routes = routes.slice()

    // Process the routes
    while (_routes.length > 0) {
        // Object with transport and nodes
        // { transport: bus, nodes: [..]}
        const route = _routes.splice(0, 1)[0]
        const _path = route.nodes
        // We need to calculate the Rank per Route
        // I choose the best rank per route for simplicity
        const _tempSteps = []
        let _globalRank = 0
        // Do it until we arrive to destination
        while (_path.length > 0) {
            const step = _path.splice(0, 1)[0]
            const _depArr = step.split('|')

            // Get all rates for this route
            // [ bus, car, train ]
            const stepInfo = _getCityInfo(source, _depArr[0], _depArr[1])
            // Get the best deal
            const _tempRank = stepInfo.map((info) => {
                return {
                    departure: info.departure,
                    arrival: info.arrival,
                    cost: _getRankRoute(info, ORDER_BY.COST.value),
                    duration: _getRankRoute(info, ORDER_BY.DURATION.value),
                    rank: _getRankRoute(info, orderby),
                    reference: info.reference,
                    transport: info.transport
                }
            }).sort((a, b) => a.rank - b.rank)[0]
            // add step and sum with total rank
            _tempSteps.push(_tempRank)
            _globalRank += _tempRank.rank
        }
        // Add route to output
        _output.push({
            rank: _globalRank,
            nodes: _tempSteps
        })
    }

    // Sort depending on rank
    return _output.sort((a, b) => {
        return a.rank - b.rank
    })

}

function _getCityVisited (_source, city, transport, _visited) {
    if (!CACHE_CITY_INFO[city]) {
        CACHE_CITY_INFO[city] = _source.filter(i => i.departure === city)
    }

    return CACHE_CITY_INFO[city].filter((i) => {
        return i.transport === transport && // only by the same transport
        !_visited[i.departure] &&
        !_visited[i.arrival]
    })
}

function _getCityInfo (_source, from, to) {
    if (!CACHE_CITY_INFO[from]) {
        CACHE_CITY_INFO[from] = _source.filter(i => i.departure === from)
    }

    return CACHE_CITY_INFO[from].filter(i => i.arrival === to)
}

function getRoutes (_source, _from, _to, orderby) {
    const _routes = []
    const _findRoutes = (_route, _stop, _visited, _path) => {
        const newPath = _deepClone(_path)
        // add city to the current path
        newPath.nodes.push(`${_route.departure}|${_route.arrival}`)

        // added city as visited
        _visited[_route.departure] = true
        const next = _getCityVisited(_source, _route.arrival, _route.transport, _visited)

        if (next.length > 0) {
            const check = next.find(i => i.arrival === _stop)
            if (check) {
                newPath.nodes.push(`${check.departure}|${check.arrival}`)
                _routes.push(newPath)
            } else {
                next.forEach((el) => {
                    _findRoutes(el, _stop, _deepClone(_visited), newPath)
                })
            }
        }
    }

    // Get Routes for the current location, get one element per destination
    const routes = _source.filter(i => i.departure === _from).reduce((acc, val) => {
        const exist = acc.find(i =>
            i.departure === val.departure &&
            i.arrival === val.arrival
        )
        // If exist already don't add
        !exist && acc.push(val)
        return acc
    }, [])

    routes.forEach((route) => {
        _findRoutes(route, _to, {}, { transport: route.transport, nodes: [] })
    })

    return renderRoutes(_source, _routes, orderby)
}

export default {
    getRoutes,
    renderRoutes,
    parseTime,
    getJSON,
    ORDER_BY
}