<template>
    <div>
        <InputsMethodLayout>
            <b-row>
                <b-col>
                    <b-input-group prepend="f(x)" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input  v-model="func" placeholder="Function"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col>
                    <b-input-group prepend="x0" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="x0" ></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col>
                    <b-input-group prepend="x1" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="x1" ></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col>
                    <b-input-group prepend="Iterations" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="iterations" placeholder="Max iterations"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col>
                    <b-input-group prepend="tolerance" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="tolerance" placeholder="Tolerance"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
        </InputsMethodLayout>
    </div>
</template>

<script>
import InputsMethodLayout from '@/layouts/Methods/InputsMethod.vue'

export default {
    name: 'InputsNonlinearInterval',
    components: { InputsMethodLayout },
    props: [
        "in_func",
        "in_x0",
        "in_x1",
        "in_iterations",
        "in_tolerance",
    ],
    data () {
        return {
            func: this.in_func,
            x0: this.in_x0,
            x1: this.in_x1,
            iterations: this.in_iterations,
            tolerance: this.in_tolerance,
        }
    },
    watch: {
        func() { this.$emit('func', this.func) },
        x0() { this.$emit('x0', this.x0) },
        x1() { this.$emit('x1', this.x1) },
        iterations() { this.$emit('iterations', this.iterations) },
        tolerance() { this.$emit('tolerance', this.tolerance) },
    }
}
</script>
