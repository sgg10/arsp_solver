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

  { path: '/gausian_elimination', name: "Linear/Elimination/GaussianElimination" },
  { path: '/partial_pivot', name: "Linear/Elimination/PartialPivot" },
  { path: '/total_pivot', name: "Linear/Elimination/TotalPivot" },

  { path: '/simple_lu', name: "Linear/Factorization/SimpleLU" },
  { path: '/pivot_lu', name: "Linear/Factorization/PivotLU" },
  { path: '/crout', name: "Linear/Factorization/Crout" },
  { path: '/doolittle', name: "Linear/Factorization/Doolittle" },
  { path: '/cholesky', name: "Linear/Factorization/Cholesky" },

  { path: '/jacobi', name: "Linear/Iterative/Jacobi" },
  { path: '/gauss_seidel', name: "Linear/Iterative/GaussSeidel" },
  { path: '/sor', name: "Linear/Iterative/SOR" },
  { path: '/vandermonde', name: "Linear/Iterative/Vandermonde" },

  { path: '/newton_div_diff', name: "Interpolation/Factorization/NewtonDivDiff" },
  { path: '/larange', name: "Interpolation/Factorization/Larange" },
  { path: '/linear_spline', name: "Interpolation/Factorization/LinearSpline" },
  { path: '/quadratic_spline', name: "Interpolation/Factorization/QuadraticSpline" },
  { path: '/cubic_spline', name: "Interpolation/Factorization/CubicSpline" },

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
