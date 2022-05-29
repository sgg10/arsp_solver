import { post } from "axios"
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'nonlinear_equations'
const API_INTERVAL_URL = API_URL + '/interval'

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

export { execIncrementalSearch }