<template>
    <div>
        <InputsMethodLayout>
            <b-row v-if="active_func">
                <b-col>
                    <b-input-group prepend="f(x)" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input  v-model="func" placeholder="Function"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row v-if="active_g" class="my-3">
                <b-col v-if="active_g">
                    <b-input-group prepend="g(x)" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input  v-model="g" placeholder="Function"></b-form-input>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-row class="my-3">
                <b-col v-if="active_x0">
                    <b-input-group prepend="x0" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="x0" ></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col v-if="active_x1">
                    <b-input-group prepend="x1" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="x1" ></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col v-if="active_xa">
                    <b-input-group prepend="xa" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-form-input v-model="xa" ></b-form-input>
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
import InputsMethodLayout from '@/layouts/Methods/InputsMethod.vue'

export default {
    name: 'InputsNonlinearInterval',
    components: { InputsMethodLayout },
    props: {
        "in_func": String || Number,
        "in_g": String || Number,
        "in_x0": String || Number,
        "in_x1": String || Number,
        "in_xa": String || Number,
        "in_iterations": String || Number,
        "in_tolerance": String || Number,

        "active_func": Boolean,
        "active_g": Boolean,
        "active_x0": Boolean,
        "active_x1": Boolean,
        "active_xa": Boolean,
        "active_iterations": Boolean,
        "active_tolerance": Boolean,
    },
    data () {
        return {
            func: this.in_func,
            g: this.in_g,
            x0: this.in_x0,
            x1: this.in_x1,
            xa: this.in_xa,
            iterations: this.in_iterations,
            tolerance: this.in_tolerance,
        }
    },
    watch: {
        func() { this.$emit('func', this.func) },
        g() { this.$emit('g', this.g) },
        x0() { this.$emit('x0', this.x0) },
        x1() { this.$emit('x1', this.x1) },
        xa() { this.$emit('xa', this.xa) },
        iterations() { this.$emit('iterations', this.iterations) },
        tolerance() { this.$emit('tolerance', this.tolerance) },
    }
}
</script>
