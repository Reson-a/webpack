<template>
  <div id="app">
    {{#router}}
    <router-view/>
    {{/router}}
    <canvas id="canvas"></canvas>
    <logo></logo>
    <sound-player :sounds="sounds"></sound-player>
  </div>
</template>

<script>
{{#unless router}}
import Logo from '@/components/Logo.vue'
import SoundPlayer from '@/components/SoundPlayer.vue'
import LightUtil from '@/js/lightUtils'
import RaycastControl from '@/js/raycastControl'
import Scene from '@/js/scene.js'

const sounds = []

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  data () {
    return {
      sounds
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let scene = this.scene = new Scene()
      scene.initControl()
      this.lightUtil = new LightUtil(scene)
      this.raycastControl = new RaycastControl(scene)

      // 渲染场景
      const renderScene = () => {
        this.scene.update()
        requestAnimationFrame(renderScene)
      }
      renderScene()
    }
  },
  components: {
    Logo,
    SoundPlayer
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
}
</style>
