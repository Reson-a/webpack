<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
{{#unless router}}
import HelloWorld from './components/HelloWorld'
import * as Light from '@/js/lightUtils'
import * as RaycastControl from '@/js/raycastControl'
import * as Scene from '@/js/scene.js'

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      Scene.init()
      Scene.initControls()
      Light.init()
      RaycastControl.init()

      // 渲染场景
      const renderScene = () => {
        Scene.update()
        requestAnimationFrame(renderScene)
      }
      renderScene()
    }
  },
  components: {
    HelloWorld
  }{{/router}}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
