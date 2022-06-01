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
        </InputsMethodLayout>
    </div>
</template>

<script>
import BEditableTable from 'bootstrap-vue-editable-table';
import InputsMethodLayout from '@/layouts/Methods/InputsMethod.vue'

export default {
    name: 'InputsInterpolation',
    components: { InputsMethodLayout, BEditableTable },
    props: {
        "in_x": Array,
        "in_y": Array,
        "in_n": String || Number,

        "active_x": Boolean,
        "active_y": Boolean,
        "active_n": Boolean,
    },
    data () {
        return {
            xFields: [],
            yFields: [],
            x: this.in_x,
            y: this.in_y,
        }
    },
    watch: {
        x() { this.$emit('x', this.x) },
        y() { this.$emit('y', this.y) },
        n(){
            this.xFields = []
            this.yFields = []

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

            this.$emit('n', this.n)
        },
    },
    created(){
        if (this.n){
            for (let i = 0; i < parseInt(this.n); i++){
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
