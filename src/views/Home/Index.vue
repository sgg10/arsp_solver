<template>
    <div class="Home">
        <HomeTitle/>
        {{f}}
        <b-row>
            <b-col>
                <MethodSection :methods="[{name: 'Online ARSP Grapher', to: '/grapher'}]" name="Grapher" />
            </b-col>
        </b-row>
        <b-row>
            <b-col col lg="4" md="6" sm="12" v-for="(section, idx) in sections" :key="idx">
                <MethodSection :methods="section.methods" :name="section.name" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import HomeTitle from './HomeTitle.vue'
import MethodSection from '@/components/MethodSection/Index.vue'

import { MathFunction } from '@/utils/Maths'

export default {
    name: "HomePage",
    components: { HomeTitle, MethodSection },
    data () {
        return {
            f: new MathFunction('x^2 + x^2', "x").get_simplify(),
            sections: [
                {
                    name: "Abiertos",
                    methods: [
                        { name: 'Incremental Search', to: 'Incremental' },
                        { name: 'Bisection', to: 'Bisection' },
                        { name: 'Secant', to: 'Secants' },
                    ]
                },
                {
                    name: "Abiertos",
                    methods: [
                        { name: 'Incremental Search', to: 'Incremental' },
                        { name: 'Bisection', to: 'Bisection' },
                        { name: 'Secant', to: 'Secants' },
                    ]
                },
                {
                    name: "Abiertos",
                    methods: [
                        { name: 'Incremental Search', to: 'Incremental' },
                        { name: 'Bisection', to: 'Bisection' },
                        { name: 'Secant', to: 'Secants' },
                    ]
                },
                {
                    name: "Abiertos",
                    methods: [
                        { name: 'Incremental Search', to: 'Incremental' },
                        { name: 'Bisection', to: 'Bisection' },
                        { name: 'Secant', to: 'Secants' },
                    ]
                },
                {
                    name: "Abiertos",
                    methods: [
                        { name: 'Incremental Search', to: 'Incremental' },
                        { name: 'Bisection', to: 'Bisection' },
                        { name: 'Secant', to: 'Secants' },
                    ]
                },
                {
                    name: "Abiertos",
                    methods: [
                        { name: 'Incremental Search', to: 'Incremental' },
                        { name: 'Bisection', to: 'Bisection' },
                        { name: 'Secant', to: 'Secants' },
                    ]
                },
            ]
        }
    }
}
</script>