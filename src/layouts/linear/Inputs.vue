<template>
    <div>
        <InputsMethodLayout>
            <b-row>
                <b-col>
                    <b-input-group prepend="Matrix Size" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input  v-model="n" placeholder="Enter size of the square matrix"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row v-if="n && active_A" class="my-3">
                <b-col cols="2" class="center">
                    <h1>A = </h1>
                </b-col>
                <b-col class="center">
                    <b-editable-table
                        bordered
                        class="editable-table matrix"
                        v-model="A"
                        :fields="AFields"
                        head-variant="light"
                    />
                </b-col>
            </b-row>
            <b-row v-if="n && active_b" class="my-3">
                <b-col cols="2" class="center">
                    <h1>b = </h1>
                </b-col>
                <b-col class="center">
                    <b-editable-table
                        bordered
                        class="editable-table matrix"
                        v-model="b"
                        :fields="BFields"
                        head-variant="light"
                    />
                </b-col>
            </b-row>
        </InputsMethodLayout>
    </div>
</template>

<script>
import BEditableTable from 'bootstrap-vue-editable-table';
import InputsMethodLayout from '@/layouts/Methods/InputsMethod.vue'

export default {
    name: 'InputslinearInterval',
    components: { InputsMethodLayout, BEditableTable },
    props: {
        "in_A": Array,
        "in_b": Array,
        "in_n": String || Number,
        "in_iterations": String || Number,
        "in_tolerance": String || Number,

        "active_A": Boolean,
        "active_b": Boolean,
        "active_n": Boolean,
        "active_iterations": Boolean,
        "active_tolerance": Boolean,
    },
    data () {
        return {
            AFields: [],
            BFields: [],
            A: this.in_A,
            b: this.in_b,
            n: this.in_n,
            iterations: this.in_iterations,
            tolerance: this.in_tolerance,
        }
    },
    watch: {
        A() { this.$emit('A', this.A) },
        b() { this.$emit('b', this.b) },
        iterations() { this.$emit('iterations', this.iterations) },
        tolerance() { this.$emit('tolerance', this.tolerance) },
        n(){
            this.AFields = []
            this.BFields = [{ key: "b", label: "B", type: "number", editable: true}]
            let aItems = []
            let bItems = []

            for (let i = 0; i < parseInt(this.n); i++){
                this.AFields.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: true })
                let row = { id: i }
                for (let j = 0; j < parseInt(this.n); j++){
                    row[`x${j}`] = ""
                }
                aItems.push(row)
                bItems.push({ id: i, b: "" })
            }
            this.A = aItems
            this.b = bItems
            this.$emit('n', this.n)
        },
    },
    created(){
        if (this.n){
            this.AFields = []
            this.BFields = [{ key: "b", label: "B", type: "number", editable: true}]
            for (let i = 0; i < parseInt(this.n); i++){
                this.AFields.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: true })
            }
        }
    }
}
</script>

<style lang="scss">
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.matrix{
    width: 100%;
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
