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
            <b-row v-if="n && active_x" class="my-3">
                <b-col cols="2" class="center">
                    <h1>x = </h1>
                </b-col>
                <b-col class="center">
                    <b-editable-table
                        bordered
                        class="editable-table matrix"
                        v-model="x"
                        :fields="xFields"
                        head-variant="light"
                    />
                </b-col>
            </b-row>
            <b-row v-if="n && active_y" class="my-3">
                <b-col cols="2" class="center">
                    <h1>y = </h1>
                </b-col>
                <b-col class="center">
                    <b-editable-table
                        bordered
                        class="editable-table matrix"
                        v-model="y"
                        :fields="yFields"
                        head-variant="light"
                    />
                </b-col>
            </b-row>
            <b-row v-if="n && active_x0" class="my-3">
                <b-col cols="2" class="center">
                    <h1>X0 = </h1>
                </b-col>
                <b-col class="center">
                    <b-editable-table
                        bordered
                        class="editable-table matrix"
                        v-model="x0"
                        :fields="x0Fields"
                        head-variant="light"
                    />
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col v-if="active_omega">
                    <b-input-group prepend="Omega" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="omega" placeholder="Omega"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col v-if="active_iterations">
                    <b-input-group prepend="Iterations" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="iterations" placeholder="Max iterations"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col v-if="active_tolerance">
                    <b-input-group prepend="tolerance" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="tolerance" placeholder="Tolerance"></b-form-input>
                    </b-input-group>
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
        "in_x": Array,
        "in_y": Array,
        "in_x0": Array,
        "in_n": String || Number,
        "in_iterations": String || Number,
        "in_tolerance": String || Number,
        "in_omega": String || Number,

        "active_A": Boolean,
        "active_b": Boolean,
        "active_x": Boolean,
        "active_y": Boolean,
        "active_n": Boolean,
        "active_x0": Boolean,
        "active_iterations": Boolean,
        "active_tolerance": Boolean,
        "active_omega": Boolean,
    },
    data () {
        return {
            AFields: [],
            BFields: [],
            x0Fields: [],
            xFields: [],
            yFields: [],
            A: this.in_A,
            b: this.in_b,
            x: this.in_x,
            y: this.in_y,
            n: this.in_n,
            x0: this.in_x0,
            iterations: this.in_iterations,
            tolerance: this.in_tolerance,
            omega: this.in_omega
        }
    },
    watch: {
        A() { this.$emit('A', this.A) },
        b() { this.$emit('b', this.b) },
        x0() { this.$emit('x0', this.x0) },
        x() { this.$emit('x', this.x) },
        y() { this.$emit('y', this.y) },
        iterations() { this.$emit('iterations', this.iterations) },
        tolerance() { this.$emit('tolerance', this.tolerance) },
        omega() { this.$emit('omega', this.omega) },
        n(){
            this.xFields = []
            this.yFields = []
            this.AFields = []
            this.BFields = [{ key: "b", label: "B", type: "number", editable: true}]
            this.x0Fields = [{ key: "x0", label: "X0", type: "number", editable: true}]
            let aItems = []
            let bItems = []
            let x0Items = []

            for (let i = 0; i < parseInt(this.n); i++){
                this.xFields.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: true })
                this.yFields.push({ key: `y${i}`, label: `Y${i}`, type: 'number', editable: true })
            }
            let x_row = { id: 0 }
            let y_row = { id: 0 }
            for (let i = 0; i < parseInt(this.n); i++){
                x_row[`x${i}`] = ""
                y_row[`y${i}`] = ""
            }
            this.x = [x_row]
            this.y = [y_row]

            for (let i = 0; i < parseInt(this.n); i++){
                this.AFields.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: true })
                let row = { id: i }
                for (let j = 0; j < parseInt(this.n); j++){
                    row[`x${j}`] = ""
                }
                aItems.push(row)
                bItems.push({ id: i, b: "" })
                x0Items.push({ id: i, x0: "" })
            }
            this.A = aItems
            this.b = bItems
            this.x0 = x0Items
            this.$emit('n', this.n)
        },
    },
    created(){
        if (this.n){
            this.AFields = []
            this.BFields = [{ key: "b", label: "B", type: "number", editable: true}]
            this.x0Fields = [{ key: "x0", label: "X0", type: "number", editable: true}]
            for (let i = 0; i < parseInt(this.n); i++){
                this.AFields.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: true })
                this.xFields.push({ key: `x${i}`, label: `X${i}`, type: 'number', editable: true })
                this.yFields.push({ key: `y${i}`, label: `Y${i}`, type: 'number', editable: true })
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
