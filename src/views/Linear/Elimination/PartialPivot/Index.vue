<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">Partial Pivot</h1>
        </div>

        <b-row>
            <b-col>
                <InputsMethodLayout
                    active_A
                    active_b
                    :in_A="A"
                    :in_b="b"
                    :in_n="n"
                    @A="SET_A($event)"
                    @b="SET_B($event)"
                    @n="SET_N($event)"
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
                <section v-for="(table, idx) in tables" :key="idx">
                    <b-row>
                        <b-col class="text-center center">
                            <b-button class="my-3" block variant="info" v-b-toggle :href="`#stage${idx}`">Stage {{idx}}</b-button>
                        </b-col>
                    </b-row>
                    <b-collapse :id="`stage${idx}`">
                        <b-row>
                            <b-col class="center">
                                <b-table
                                    class="table_function"
                                    hover
                                    :items="table"
                                    :fields="headers"
                                    head-variant="light"
                                    responsive="md"
                                    striped
                                    bordered
                                >
                                </b-table>
                            </b-col>
                        </b-row>
                    </b-collapse>
                </section>
                <b-row v-if="result">
                    <b-col class="text-center center my-3">
                        <b-editable-table
                            bordered
                            head-variant="light"
                            class="editable-table matrix"
                            v-model="result"
                            :fields="[{ key: 'x', label: 'X', type: 'number', editable: false }]"
                        />
                    </b-col>
                </b-row>
            </section>
        </ResultsMethodLayout>
    </div>
</template>

<script>
// TODO: Change to Partial Pivot Method
// import HelpsMethodLayout from '@/layouts/HelpsMethod.vue'
import { mapState, mapMutations } from 'vuex'
import InputsMethodLayout from '@/layouts/linear/Inputs.vue'
import ResultsMethodLayout from '@/layouts/Methods/ResultsMethod.vue'
import { execGuassianElimination } from '@/api/linear'
import BEditableTable from 'bootstrap-vue-editable-table';

export default {
    name: 'PartialPivot',
    components: { InputsMethodLayout, ResultsMethodLayout, BEditableTable },
    data () {
        return {
            result: '',
            method_status: '',
            tables: [],
            headers: []
        }
    },
    methods: {
        ...mapMutations('linear', ['SET_A', 'SET_B', 'SET_N']),
        async execMethod(){
            const {A, b} = this.convertMatrix()

            this.result = ''
            this.method_status = ''
            this.tables = []
            const config = { A, b }
            const { data } = await execGuassianElimination(config)
            console.log(data)
            const { method_status, result } = data
            const { stages, x } = result
            let xRows = []
            for (let i = 0; i < x.length; i++) {
                xRows.push({ 'x': x[i], id: i })
            }
            for (let i = 0; i < stages[0][0].length; i++) {
                this.headers.push(i+1 == stages[0][0].length ? "b" : `x${i}`)
            }
            this.result = xRows
            this.method_status = method_status
            this.tables = this.transformRows(stages)
        },
        transformRows(iterations){

            let tables = []

            iterations.forEach(iteration => {
                let table = []
                iteration.forEach(row => {
                    let transformed_row = {}
                    for (let i = 0; i < row.length; i++){
                        transformed_row[i+1 == row.length ? "b" : `x${i}`] = row[i]
                    }
                    table.push(transformed_row)
                })
                tables.push(table)
            })

            return tables
        },
        convertMatrix(){
            let A = []
            let b = []
            for (let i = 0; i < parseInt(this.n); i++) {
                let a_row = []
                for (let j = 0; j < parseInt(this.n); j++){
                    a_row.push(parseFloat(this.A[i][`x${j}`]))
                }
                A.push(a_row)
                b.push([parseFloat(this.b[i]['b'])])
            }
            return {A, b}
        }
    },
    computed: {
        ...mapState('linear', ["A", "b", "n"])
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