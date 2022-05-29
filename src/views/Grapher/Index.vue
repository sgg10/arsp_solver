<template>
    <div>
        <b-row>
            <b-col class="text-left my-5">
                <b-row>
                    <b-col>
                        <b-input-group prepend="f(x)" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-form-input v-model="function_config.func" placeholder="Function"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                <b-row class="my-3">
                    <b-col>
                        <b-form-checkbox
                            v-model="graph_config"
                            name="graph_config"
                            :value="true"
                            :unchecked-value="false"
                        >
                            Custom Graph configuration
                        </b-form-checkbox>
                    </b-col>
                </b-row>
                <section v-if="graph_config">
                    <b-row>
                        <b-col>
                            <b-input-group prepend="a" class="mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input v-model="function_config.a" placeholder="X Low Limit"></b-form-input>
                            </b-input-group>
                        </b-col>
                        <b-col>
                            <b-input-group prepend="b" class="mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input v-model="function_config.b" placeholder="X High Limit"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                    <b-row class="my-3">
                        <b-col>
                            <b-input-group prepend="N. Points" class="mb-2 mr-sm-2 mb-sm-0">
                                <b-form-input v-model="function_config.points" placeholder="Points"></b-form-input>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </section>
                <b-row>
                    <b-col>
                        <b-button variant="success" block @click="graph">Graficar</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="justify-content-lg-center" v-if="function_image">
            <b-col class="text-center" col lg="6">
                <Chart :src="function_image"/>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="text-center">
                <FunctionInfo
                    v-if="function_info.derivated_function || function_info.simplified_function || function_info.integrated_function"
                    :funcInfo="function_info"
                />
            </b-col>
        </b-row>

    </div>
</template>

<script>
import Chart from '@/components/Chart.vue'
import FunctionInfo from './FunctionInfo.vue'
import { getFuntionGraph } from '@/api/grapher'

export default {
    name: 'Grapher',
    components: { Chart, FunctionInfo },
    data () {
        return {
            function_config: {
                func: '',
                a: -10,
                b: 10,
                points: 100
            },
            function_info: {
                derivated_function: "",
                simplified_function: "",
                integrated_function: ""
            },
            function_image: null,
            graph_config: false
        }
    },
    watch: {
        graph_config(){
            this.function_config.a = -10;
            this.function_config.b = 10;
            this.function_config.points = 100;
        }
    },
    methods: {
        async graph(){
            const { data } = await getFuntionGraph(this.function_config)

            let {graph_image, derivative_function, simplified_function, integrate_function} = data
            this.function_image = graph_image
            this.function_info.derivated_function = derivative_function
            this.function_info.simplified_function = simplified_function
            this.function_info.integrated_function = integrate_function
        }
    }
}
</script>
