import { post } from "axios"
import { BASE_API_URL } from '@/constants'

const API_URL = BASE_API_URL + 'linear_equations'
const API_ELIMINATION_URL = API_URL + '/elimination'
const API_FACTORIZATION_URL = API_URL + '/factorization'
const API_ITERATIVE_URL = API_URL + '/iterative'

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

function execTotalPivot({ A, b, }){
    let { config, data } = eliminationRequest(A, b)
    return post(API_ELIMINATION_URL + '/total_pivot', data, config)
}


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

function iterativeRequest(A, b, n, x0, iterations, tolerance, x, y, omega) {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    const data = JSON.stringify({
        A, b, n, x0, iterations, tolerance, x, y, omega
    });
    return {config, data}
}

function execJacobi({ A, b, x0, n, iterations, tolerance }){
    let { config, data } = iterativeRequest(A, b, n, x0, iterations, tolerance)
    return post(API_ITERATIVE_URL + '/jacobi', data, config)
}

function execSOR({ A, b, x0, n, iterations, tolerance, omega }){
    let { config, data } = iterativeRequest(A, b, n, x0, iterations, tolerance, null, null, omega)
    return post(API_ITERATIVE_URL + '/sor', data, config)
}

function execVandermonde({ A, b, x0, n, iterations, tolerance, x, y }){
    let { config, data } = iterativeRequest(A, b, n, x0, iterations, tolerance, x, y)
    return post(API_ITERATIVE_URL + '/vandermonde', data, config)
}

export {
    execGuassianElimination,
    execTotalPivot,
    execCrout,
    execDoolittle,
    execCholesky,
    execPartialLU,
    execJacobi,
    execSOR,
    execVandermonde
}