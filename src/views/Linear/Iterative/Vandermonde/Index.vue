<template>
    <div>
        <div class="text-center">
            <h1 class="my-5">Vandermonde</h1>
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
            <section id="result" v-if="table">
                <b-row >
                    <b-col class="text-center center my-3">
                        <b-table
                            bordered
                            head-variant="light"
                            class="table_function"
                            :items="table"
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
import { execVandermonde } from '@/api/linear'
// import BEditableTable from 'bootstrap-vue-editable-table';

export default {
    name: 'Vandermonde',
    components: { InputsMethodLayout, ResultsMethodLayout },
    data () {
        return {
            iterations: '',
            method_status: '',
            table: [],
            headers: []
        }
    },
    methods: {
        ...mapMutations('linear', ['SET_X', 'SET_Y', 'SET_N']),
        async execMethod(){
            const {x, y} = this.convertMatrix()
            this.method_status = ''
            this.headers = []
            this.table = []
            const config = { x , y }
            const { data: { method_status, result } } = await execVandermonde(config)
            this.method_status = method_status
            let rows = []
            result.forEach((iteration, id) => {
                let row = { id }
                for (let i = 0; i < x.length; i++) {
                    row[`x${i}`] = iteration[i]
                }
                rows.push(row)
            })
            this.table = rows
            for (let i = 0; i < x.length; i++) {
                this.headers.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: false })
            }
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