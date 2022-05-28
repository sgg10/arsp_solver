import { post } from 'axios'

const BASE_API_URL = 'http://127.0.0.1:5000/api/'
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