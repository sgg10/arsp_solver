export default {
    namespaced: true,
    state: {
        A: null,
        b: null,
        n: null,
        x0: null,
        x: null,
        y: null,
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
        SET_X0: (state, payload) => {
            state.x0 = payload
        },
        SET_X: (state, payload) => {
            state.x = payload
        },
        SET_Y: (state, payload) => {
            state.y = payload
        },
        SET_ITERATIONS: (state, payload) => {
            state.iterations = payload
        },
        SET_TOLERANCE: (state, payload) => {
            state.tolerance = payload
        }
    }
}