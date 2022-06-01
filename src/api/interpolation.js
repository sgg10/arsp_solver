import { post } from "axios"
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'interpolation'

function interpolationRequest(x, y, n){
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const data = JSON.stringify({ x, y, n });
    return {config, data}
}

function execDivDiff({ x, y }){
    let { config, data } = interpolationRequest(x, y)
    return post(API_URL + '/divided_differences', data, config)
}

function execLarange({ x, y }){
    let { config, data } = interpolationRequest(x, y)
    return post(API_URL + '/larange', data, config)
}

function execLinearSpline({ x, y, n }){
    let { config, data } = interpolationRequest(x, y, n)
    return post(API_URL + '/linear_spline', data, config)
}

export { execDivDiff, execLarange, execLinearSpline }