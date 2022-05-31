<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">Cholesky</h1>
        </div>

        <b-row>
            <b-col>
                <InputsMethodLayout
                    active_A
                    :in_A="A"
                    :in_n="n"
                    @A="SET_A($event)"
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
            <section id="result" v-if="L && U">
                <section>
                    <b-row class="my-3">
                        <b-col class="text-center center"><h3>L</h3></b-col>
                    </b-row>
                    <b-row class="my-3">
                        <b-col class="center">
                            <b-table
                                class="table_function"
                                hover
                                :items="L"
                                :fields="headers"
                                head-variant="light"
                                responsive="md"
                                striped
                                bordered
                            >
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row class="my-3">
                        <b-col class="text-center center"><h3>U</h3></b-col>
                    </b-row>
                    <b-row class="my-3">
                        <b-col class="center">
                            <b-table
                                class="table_function"
                                hover
                                :items="U"
                                :fields="headers"
                                head-variant="light"
                                responsive="md"
                                striped
                                bordered
                            >
                            </b-table>
                        </b-col>
                    </b-row>
                </section>
            </section>
        </ResultsMethodLayout>
    </div>
</template>

<script>
// import HelpsMethodLayout from '@/layouts/HelpsMethod.vue'
import { mapState, mapMutations } from 'vuex'
import InputsMethodLayout from '@/layouts/linear/Inputs.vue'
import ResultsMethodLayout from '@/layouts/Methods/ResultsMethod.vue'
import { execCholesky } from '@/api/linear'
// import BEditableTable from 'bootstrap-vue-editable-table';

export default {
    name: 'Cholesky',
    components: { InputsMethodLayout, ResultsMethodLayout },
    data () {
        return {
            L: '',
            U: '',
            method_status: '',
            tables: [],
            headers: []
        }
    },
    methods: {
        ...mapMutations('linear', ['SET_A', 'SET_N']),
        async execMethod(){
            const A = this.convertMatrix()

            this.result = ''
            this.method_status = ''
            this.tables = []
            const config = { A }
            const { data: { result: { L, U } }, method_status  } = await execCholesky(config)
            this.method_status = method_status
            for (let i = 0; i < L.length; i++) {
                this.headers.push(`x${i}`)
            }
            this.L = this.transformRows(L)
            this.U = this.transformRows(U)
        },
        transformRows(table_data){

            let table = []
            table_data.forEach(row => {
                let transformed_row = {}
                for (let i = 0; i < row.length; i++){
                    transformed_row[`x${i}`] = row[i]
                }
                table.push(transformed_row)
            })

            return table
        },
        convertMatrix(){
            let A = []
            for (let i = 0; i < parseInt(this.n); i++) {
                let a_row = []
                for (let j = 0; j < parseInt(this.n); j++){
                    a_row.push(parseFloat(this.A[i][`x${j}`]))
                }
                A.push(a_row)
            }
            return A
        }
    },
    computed: {
        ...mapState('linear', ["A", "n"])
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