import { post } from "axios"
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'nonlinear_equations'
const API_INTERVAL_URL = API_URL + '/interval'
const API_OPEN_URL = API_URL + '/open'

// * Interval

function intervalRequest(func, x0, x1, iterations, tolerance){
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const data = JSON.stringify({
        "function": func, x0, x1, iterations, tolerance
    });
    return {config, data}
}

function execIncrementalSearch({func, x0, x1, iterations, tolerance}){
    let { config, data } = intervalRequest(func, x0, x1, iterations, tolerance)
    return post(API_INTERVAL_URL + '/incremental_search', data, config)
}

function execBisection({func, x0, x1, iterations, tolerance}){
    let { config, data } = intervalRequest(func, x0, x1, iterations, tolerance)
    return post(API_INTERVAL_URL + '/bisection', data, config)
}

function execFalseRule({func, x0, x1, iterations, tolerance}){
    let { config, data } = intervalRequest(func, x0, x1, iterations, tolerance)
    return post(API_INTERVAL_URL + '/false_rule', data, config)
}

// * Open

function openRequest({func, x0=null, iterations, tolerance, x1=null, xa=null, g=null}){
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    let data_body = {x0, x1, iterations, tolerance, xa, g}
    data_body[g ? "f" : "function"] = func
    const data = JSON.stringify(data_body);
    return {config, data}
}

function execNewton({func, x0, iterations, tolerance}){
    let { config, data } = openRequest({func, x0, iterations, tolerance})
    return post(API_OPEN_URL + '/newton', data, config)
}

function execMultiRoot({func, x0, iterations, tolerance}){
    let { config, data } = openRequest({func, x0, iterations, tolerance})
    return post(API_OPEN_URL + '/multi_root', data, config)
}

function execSecant({func, x0, x1, iterations, tolerance}){
    let { config, data } = openRequest({func, x0, iterations, tolerance, x1})
    return post(API_OPEN_URL + '/secant', data, config)
}

function execFixedPoint({func, x0, iterations, tolerance, x1, xa, g}){
    let { config, data } = openRequest({func, x0, iterations, tolerance, x1, xa, g})
    return post(API_OPEN_URL + '/fixed_point', data, config)
}

export {
    execIncrementalSearch,
    execBisection,
    execFalseRule,
    execNewton,
    execMultiRoot,
    execSecant,
    execFixedPoint
}