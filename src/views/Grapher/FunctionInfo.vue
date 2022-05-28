<template>
    <div>
        <b-row>
            <b-col>
                <h1>Information about function</h1>
            </b-col>
        </b-row>
        <b-row v-if="funcInfo.simplified_function">
            <b-col>
                <h2>Simplification: {{funcInfo.simplified_function}}</h2>
            </b-col>
        </b-row>
        <b-row v-if="funcInfo.derivated_function">
            <b-col>
                <h2>Derivate: {{funcInfo.derivated_function}}</h2>
            </b-col>
        </b-row>
        <b-row v-if="funcInfo.integrated_function">
            <b-col>
                <h2>Integral: {{funcInfo.integrated_function}}</h2>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'FuntionInfo',
    props: {
        funcInfo: {
            required: false,
            type: Object
        }
    }
}
</script>
