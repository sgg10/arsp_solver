import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerOptions = [
  { path: '/', name: 'Home' },
  { path: '/grapher', name: "Grapher" },
  { path: '/incremental_search', name: "Nonlinear/Interval/IncrementalSearch" },
  { path: '/bisection', name: "Nonlinear/Interval/Bisection" },
  { path: '/false_rule', name: "Nonlinear/Interval/FalseRule" },
  { path: '/newton', name: "Nonlinear/Open/Newton" },
  { path: '/multi_roots', name: "Nonlinear/Open/MultiRoots" },
  { path: '/secant', name: "Nonlinear/Open/Secant" },
  { path: '/fixed_point', name: "Nonlinear/Open/FixedPoint" },
  { path: '*', redirect: { name: 'Home' } }
]

const routes = routerOptions.map(r => {
  return {
    ...r,
    component: () => import(/* webpackChunkName: "[request]" */`@/views/${r.name}/Index.vue`)
  }
})

const router = new VueRouter({
  routes
})

export default router
