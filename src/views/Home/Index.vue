<template>
    <div class="Home">
        <HomeTitle/>
        <b-row>
            <b-col>
                <MethodSection :methods="[{name: 'Online ARSP Grapher', to: 'Grapher'}]" name="Grapher" />
            </b-col>
        </b-row>
        <b-row>
            <b-col col lg="4" md="6" sm="12" v-for="(section, idx) in sections" :key="idx">
                <MethodSection :methods="section.methods" :name="section.name" />
            </b-col>
        </b-row>
        <b-row >
            <b-col class="center">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/UqHWHz8BhZE"
                    title=""
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import HomeTitle from './HomeTitle.vue'
import MethodSection from '@/components/MethodSection/Index.vue'
import methodsData from "@/data/methods_config.json"

export default {
    name: "HomePage",
    components: { HomeTitle, MethodSection },
    data () {
        return {
            sections: methodsData
        }
    }
}
</script>

<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
