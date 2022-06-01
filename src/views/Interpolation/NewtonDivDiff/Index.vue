<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">Newton Divided Differences</h1>
        </div>

        <b-row>
            <b-col>
                <InputsMethodLayout
                    active_x
                    active_y
                    :in_x="x"
                    :in_y="y"
                    :in_n="n"
                    @x="SET_X($event)"
                    @y="SET_Y($event)"
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
            <section id="result" >
                <b-row >
                    <b-col class="text-center center my-3">
                        <b-table
                            bordered
                            head-variant="light"
                            class="table_function"
                            :items="table"
                            :fields="headers.matrix"
                            responsive="md"
                            striped
                        />
                    </b-col>
                </b-row>
                <b-row >
                    <b-col class="text-center center my-3">
                        <b-table
                            bordered
                            head-variant="light"
                            class="table_function"
                            :items="coef"
                            :fields="headers.coef"
                            responsive="md"
                            striped
                        />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <h4>{{pol}}</h4>
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
import { execDivDiff } from '@/api/interpolation'
// import BEditableTable from 'bootstrap-vue-editable-table';

export default {
    name: 'NewtonDividedDifferences',
    components: { InputsMethodLayout, ResultsMethodLayout },
    data () {
        return {
            method_status: '',
            table: [],
            headers: {
                coef: [],
                matrix: []
            },
            coef: [],
            pol: ''
        }
    },
    methods: {
        ...mapMutations('linear', ['SET_X', 'SET_Y', 'SET_N']),
        async execMethod(){
            const {x, y} = this.convertMatrix()
            this.method_status = ''
            this.headers = {
                coef: [],
                matrix: []
            }
            this.table = []
            const config = { x , y }
            const { data: { method_status, result: { coef, matrix, pol } } } = await execDivDiff(config)
            this.method_status = method_status
            this.pol = pol
            this.transformRows(coef, matrix)
        },
        transformRows(coef, matrix){
            let newMatrix = []
            let newCoef = []

            let col = { id: 0}
            coef.forEach((element, id) => {
                col[`coef${id}`] = element
            });
            newCoef.push(col)

            matrix.forEach((row, row_id) => {
                let colInfo = { id: row_id }
                row.forEach((col, col_id) => {
                    colInfo[`x${col_id}`] = col
                })
                newMatrix.push(colInfo)

            })

            for (let i = 0; i < coef.length; i++) {
                this.headers.coef.push({ key: `coef${i}`, label: `COEF${i}`})
                this.headers.matrix.push({ key: `x${i}`, label: `X${i}`})
            }

            this.table = newMatrix
            this.coef = newCoef

        },
        convertMatrix(){
            let x = []
            let y = []
            for (let i = 0; i < parseInt(this.n); i++) {
                x.push(parseFloat(this.x[0][`x${i}`]))
                y.push(parseFloat(this.y[0][`y${i}`]))
            }
            return {x, y}
        }
    },
    computed: {
        ...mapState('linear', ["x", "y", "n"])
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