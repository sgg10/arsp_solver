<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">SOR</h1>
        </div>

        <b-row>
            <b-col>
                <InputsMethodLayout
                    active_A
                    active_b
                    active_x0
                    active_omega
                    active_iterations
                    active_tolerance
                    :in_A="A"
                    :in_b="b"
                    :in_n="n"
                    :in_x0="x0"
                    :in_tolerance="tolerance"
                    :in_iterations="iterations"
                    :in_omega="omega"
                    @A="SET_A($event)"
                    @b="SET_B($event)"
                    @x0="SET_X0($event)"
                    @n="SET_N($event)"
                    @tolerance="SET_TOLERANCE($event)"
                    @iterations="SET_ITERATIONS($event)"
                    @omega="SET_OMEGA($event)"
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
            <section id="result" v-if="x || stages">
                <b-row v-if="stages">
                    <b-col class="text-center center my-3">
                        <b-table
                            bordered
                            head-variant="light"
                            class="table_function"
                            :items="stages"
                            :fields="headers"
                            responsive="md"
                            striped
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="text-center center my-3">
                        <b-table
                            bordered
                            head-variant="light"
                            class="table_function"
                            :items="x"
                            :fields="headers"
                            responsive="md"
                            striped
                        />
                    </b-col>
                </b-row>

            </section>
        </ResultsMethodLayout>
    </div>
</template>

<script>
// import HelpsMethodLayout from '@/layouts/HelpsMethod.vue'
import { mapState, mapMutations } from 'vuex'
import InputsMethodLayout from '@/layouts/linear/Inputs.vue'
import ResultsMethodLayout from '@/layouts/Methods/ResultsMethod.vue'
import { execSOR } from '@/api/linear'
// import BEditableTable from 'bootstrap-vue-editable-table';

export default {
    name: 'Jacobi',
    components: { InputsMethodLayout, ResultsMethodLayout },
    data () {
        return {
            x: '',
            stages: '',
            method_status: '',
            headers: []
        }
    },
    methods: {
        ...mapMutations('linear', [
            'SET_A',
            'SET_B',
            'SET_X0',
            'SET_N',
            'SET_TOLERANCE',
            'SET_ITERATIONS',
            'SET_OMEGA'
        ]),
        async execMethod(){
            const {A, b, x0} = this.convertMatrix()
            this.result = ''
            this.method_status = ''
            this.tables = []
            this.headers = []
            this.x = []
            const config = { A, b, 'iterations': this.iterations, x0, 'tolerance': this.tolerance, 'omega': this.omega }
            const { data } = await execSOR(config)
            const { method_status, result } = data
            this.method_status = method_status
            for (let i = 0; i < result.length; i++) {
                this.headers.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: false })
            }
            let xRow = {}
            for (let i = 0; i < result.length; i++) {
                xRow[`x${i}`] = result[i]
            }
            this.x = [xRow]
        },
        transformRows(iterations){

            let stages = []

            iterations.forEach(iteration => {
                let tables = { L: [], U: [] }
                const { L, U } = iteration
                L.forEach(row => {
                    let transformed_row = {}
                    for (let i = 0; i < row.length; i++){
                        transformed_row[`x${i}`] = row[i]
                    }
                    tables.L.push(transformed_row)
                })
                U.forEach(row => {
                    let transformed_row = {}
                    for (let i = 0; i < row.length; i++){
                        transformed_row[`x${i}`] = row[i]
                    }
                    tables.U.push(transformed_row)
                })
                stages.push(tables)
            })

            return stages
        },
        convertMatrix(){
            let A = []
            let b = []
            let x0 = []
            for (let i = 0; i < parseInt(this.n); i++) {
                let a_row = []
                for (let j = 0; j < parseInt(this.n); j++){
                    a_row.push(parseFloat(this.A[i][`x${j}`]))
                }
                A.push(a_row)
                b.push(parseFloat(this.b[i]['b']))
                x0.push(parseFloat(this.x0[i]['x0']))
            }
            return {A, b, x0}
        }
    },
    computed: {
        ...mapState('linear', ["A", "b", 'x0', "n", 'tolerance', 'iterations', 'omega'])
    }
}
</script>

<style lang="scss" scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.table_function{
    background-color: #c0c0c0;
}

.matrix{
    background-color: #c0c0c0;
}

table.editable-table td {
    vertical-align: middle;
}

.editable-table .data-cell {
    padding: 8px;
    vertical-align: middle;
}

</style>