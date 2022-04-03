<template>
  <div id="app">
    <Loadlayout v-if="isLoading">
      <BaseLoading/>
    </Loadlayout>

    <Mainlayout v-else/>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loadlayout from './layouts/LoadLayout'
import Mainlayout from './layouts/MainLayout'
import BaseLoading from '@/components/BaseLoading.vue'

export default {
  name: 'App',
  components: { Mainlayout, Loadlayout, BaseLoading },
  computed: {
    ...mapState('loading', { isLoading: 'isLoading' })
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(9, 38, 49);
  color: #FFFFFF;
}
</style>
