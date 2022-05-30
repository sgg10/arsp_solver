export default {
    namespaced: true,
    state: {
        A: null,
        b: null,
        n: null,
        iterations: null,
        tolerance: '1e-7'
    },
    mutations: {
        SET_A: (state, payload) => {
            state.A = payload
        },
        SET_B: (state, payload) => {
            state.b = payload
        },
        SET_N: (state, payload) => {
            state.n = payload
        },
        SET_ITERATIONS: (state, payload) => {
            state.iterations = payload
        },
        SET_TOLERANCE: (state, payload) => {
            state.tolerance = payload
        }
    }
}