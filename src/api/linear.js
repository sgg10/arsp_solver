import { post } from "axios"
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'linear_equations'
const API_ELIMINATION_URL = API_URL + '/elimination'
// const API_FACTORIZATION_URL = API_URL + '/factorization'
// const API_ITERATIVE_URL = API_URL + '/iterative'

// * Elimination
function eliminationRequest(A, b) {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const data = JSON.stringify({
        A, b
    });
    return {config, data}
}

function execGuassianElimination({ A, b }){
    let { config, data } = eliminationRequest(A, b)
    return post(API_ELIMINATION_URL + '/gaussian_elimination', data, config)
}

// function execPartialPivot({ A, b }){
//     let { config, data } = eliminationRequest(A, b)
//     return post(API_ELIMINATION_URL + '/gaussian_elimination', data, config)
// }

// function execGuassianElimination({ A, b }){
//     let { config, data } = eliminationRequest(A, b)
//     return post(API_ELIMINATION_URL + '/gaussian_elimination', data, config)
// }


// * Factorization

// * Iterative

export { execGuassianElimination }