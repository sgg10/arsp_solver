import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faVuejs, faBootstrap, faFontAwesome, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faVuejs, faBootstrap, faFontAwesome, faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)
