<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">Fixed Point</h1>
        </div>

        <b-row>
            <b-col>
                <InputsMethodLayout
                    active_func
                    active_g
                    active_xa
                    active_iterations
                    active_tolerance
                    :in_func="func"
                    :in_g="g"
                    :in_xa="xa"
                    :in_iterations="iterations"
                    :in_tolerance="tolerance"
                    @func="SET_FUNC($event)"
                    @g="SET_G($event)"
                    @xa="SET_XA($event)"
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
                    <b-col cols="1" class="text-right">
                        <b-icon-check-circle-fill variant="success" font-scale="2" />
                    </b-col>
                    <b-col>
                        <h1>Result</h1>
                    </b-col>
                </b-row>
            </section>
            <section id="failed_result" v-if="method_status=='failed'">
                <b-row >
                    <b-col cols="1" class="text-right">
                        <b-icon-dash-circle-fill variant="danger" font-scale="2" />
                    </b-col>
                    <b-col>
                        <h1>Result</h1>
                    </b-col>
                </b-row>
            </section>
            <section id="result">
                <b-row>
                    <b-col class="text-center" >
                        <b-table
                            class="table_function"
                            hover
                            :items="table"
                            :fields="headers"
                            head-variant="light"
                            responsive="lg"
                            striped
                            bordered
                        >
                        </b-table>
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
import { execFixedPoint } from '@/api/nonlinear'

export default {
    name: 'Secant',
    components: { InputsMethodLayout, ResultsMethodLayout },
    data () {
        return {
            result: '',
            method_status: '',
            table: [],
            headers: []
        }
    },
    methods: {
        ...mapMutations('nonlinear', [
            'SET_FUNC',
            'SET_XA',
            'SET_G',
            'SET_ITERATIONS',
            'SET_TOLERANCE'
        ]),
        async execMethod(){
            this.result = ''
            this.method_status = ''
            this.table = []
            this.headers = ["i", "x", "f(x)", "Error"]
            const config = {
                func: this.func,
                g: this.g,
                xa: this.xa,
                tolerance: this.tolerance,
                iterations: this.iterations
            }
            const { data } = await execFixedPoint(config)
            const { method_status, result, iterations } = data
            this.result = result
            this.method_status = method_status
            this.table = this.transformRows(iterations)

        },
        transformRows(iterations){
            return iterations.map((row) => ({
                i: row[0], x0: row[1], 'f(x)': row[2], 'Error': row[3]
            }))
        }
    },
    computed: {
        ...mapState('nonlinear', ["func", "g", "xa", "iterations", "tolerance"])
    }
}
</script>

<style lang="scss" scoped>
.table_function{
    background-color: #c0c0c0;
}
</style>
