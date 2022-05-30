export default {
    namespaced: true,
    state: {
        func: null,
        g: null,
        x0: null,
        x1: null,
        xa: null,
        iterations: null,
        tolerance: '1e-7'
    },
    mutations: {
        SET_FUNC: (state, payload) => {
            state.func = payload
        },
        SET_G: (state, payload) => {
            state.g = payload
        },
        SET_X0: (state, payload) => {
            state.x0 = payload
        },
        SET_X1: (state, payload) => {
            state.x1 = payload
        },
        SET_XA: (state, payload) => {
            state.xa = payload
        },
        SET_ITERATIONS: (state, payload) => {
            state.iterations = payload
        },
        SET_TOLERANCE: (state, payload) => {
            state.tolerance = payload
        }
    }
}