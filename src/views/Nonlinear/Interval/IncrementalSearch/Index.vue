<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">Incremental Search</h1>
        </div>

        <b-row>
            <b-col>
                <InputsMethodLayout
                    active_func
                    active_x0
                    active_x1
                    active_iterations
                    active_tolerance
                    :in_func="func"
                    :in_x0="x0"
                    :in_x1="x1"
                    :in_iterations="iterations"
                    :in_tolerance="tolerance"
                    @func="SET_FUNC($event)"
                    @x0="SET_X0($event)"
                    @x1="SET_X1($event)"
                    @iterations="SET_ITERATIONS($event)"
                    @tolerance="SET_TOLERANCE($event)"
                />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button block variant="success" @click="execMethod">Execute</b-button>
            </b-col>
        </b-row>
        <ResultsMethodLayout>
            <section id="success_result" v-if="method_status=='success'">
                <b-row >
                    <b-col cols="2" class="text-center">
                        <b-icon-check-circle-fill variant="success" font-scale="2" />
                    </b-col>
                    <b-col>
                        <h1>Result</h1>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text-center">
                        <h5>{{ typeof result == typeof ''  ? result : result[0] }}</h5>
                    </b-col>
                </b-row>
            </section>
            <section id="success_result" v-if="method_status=='failed'">
                <b-row >
                    <b-col cols="1" class="text-right">
                        <b-icon-dash-circle-fill variant="danger" font-scale="2" />
                    </b-col>
                    <b-col>
                        <h1>Result</h1>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text-center">
                        <h5>{{ typeof result == typeof ''  ? result : result[0] }}</h5>
                    </b-col>
                </b-row>
            </section>
        </ResultsMethodLayout>
    </div>
</template>

<script>
// import HelpsMethodLayout from '@/layouts/HelpsMethod.vue'
import { mapState, mapMutations } from 'vuex'
import InputsMethodLayout from '@/layouts/nonlinear/Inputs.vue'
import ResultsMethodLayout from '@/layouts/Methods/ResultsMethod.vue'
import { execIncrementalSearch } from '@/api/nonlinear'

export default {
    name: 'IncrementalSearch',
    components: { InputsMethodLayout, ResultsMethodLayout },
    data () {
        return {
            result: '',
            method_status: '',
            graph: ''
        }
    },
    methods: {
        ...mapMutations('nonlinear', [
            'SET_FUNC',
            'SET_X0',
            'SET_X1',
            'SET_ITERATIONS',
            'SET_TOLERANCE'
        ]),
        async execMethod(){
            this.result = ''
            this.method_status = ''
            const config = {
                func: this.func,
                x0: this.x0,
                x1: this.x1,
                tolerance: this.tolerance,
                iterations: this.iterations
            }
            const { data } = await execIncrementalSearch(config)
            const {method_status, result } = data
            this.result = result
            this.method_status = method_status
        },
    },
    computed: {
        ...mapState('nonlinear', ["func", "x0", "x1", "iterations", "tolerance"])
    }
}
</script>
