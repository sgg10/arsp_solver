import { post } from "axios"
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'linear_equations'
const API_ELIMINATION_URL = API_URL + '/elimination'
const API_FACTORIZATION_URL = API_URL + '/factorization'
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

function factorizationRequest(A, b, n) {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const data = JSON.stringify({
        A, b, n
    });
    return {config, data}
}

function execCrout({ A, b, n }){
    let { config, data } = factorizationRequest(A, b, n)
    return post(API_FACTORIZATION_URL + '/croult', data, config)
}

function execDoolittle({ A, b, n }){
    let { config, data } = factorizationRequest(A, b, n)
    return post(API_FACTORIZATION_URL + '/doolittle', data, config)
}

function execCholesky({ A }){
    let { config, data } = factorizationRequest(A)
    return post(API_FACTORIZATION_URL + '/cholesky', data, config)
}

function execPartialLU({ A }){
    let { config, data } = factorizationRequest(A)
    return post(API_FACTORIZATION_URL + '/partial_lu', data, config)
}

// * Iterative

export { execGuassianElimination, execCrout, execDoolittle, execCholesky, execPartialLU }