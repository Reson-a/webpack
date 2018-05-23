{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import CONFIG from '@/js/config'
{{#router}}
import router from './router'
{{/router}}
import store from '@/store'

import '@/styles/index.css'
const detector = require('@/libs/Detector.js')

if (!detector.webgl) document.getElementById('error-panel').style.display = 'block'

else {
  window.THREE = require('three')
  if (CONFIG.isDebug) {
    window.Stats = require('@/libs/stats.js').Stats
  }
  require('@/libs/FBXLoader.js')
  require('@/libs/OrbitControls.js')

  Vue.config.productionTip = false
  Vue.prototype.$eventBus = new Vue()

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    {{#if_eq build "runtime"}}
    render: h => h(App),
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    components: { App },
    template: '<App/>',
    {{/if_eq}}
    store
  })
}