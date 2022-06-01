export default {
    namespaced: true,
    state: {
        x: null,
        y: null,
        n: null
    },
    mutations: {
        SET_N: (state, payload) => {
            state.n = payload
        },
        SET_X: (state, payload) => {
            state.x = payload
        },
        SET_Y: (state, payload) => {
            state.y = payload
        },
    }
}