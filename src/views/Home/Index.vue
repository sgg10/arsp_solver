<template>
    <div class="Home">
        <HomeTitle/>
        <b-row>
            <b-col>
                <MethodSection :methods="[{name: 'Online ARSP Grapher', to: 'Grapher'}]" name="Grapher" />
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4" v-for="(section, idx) in sections" :key="idx">
                <MethodSection :methods="section.methods" :name="section.name" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import HomeTitle from './HomeTitle.vue'
import MethodSection from '@/components/MethodSection/Index.vue'

export default {
    name: "HomePage",
    components: { HomeTitle, MethodSection },
    data () {
        return {
            sections: []
        }
    }
}
</script>