import { post } from 'axios'
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'grapher'

function getFuntionGraph({func, a=-10, b=10, points=100}) {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const data = JSON.stringify({
        "function": func,
        a, b, points
    });

    return post(API_URL+"/graph", data, config)
}

export { getFuntionGraph }