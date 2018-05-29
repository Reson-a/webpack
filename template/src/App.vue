<template>
  <div id="app">
    <model-loader @loading-completed="init"></model-loader>
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
import IconButton from '@/components/IconButton.vue'
import ModelLoader from '@/components/ModelLoader.vue'
import LightUtil from '@/js/lightUtils'
import RaycastControl from '@/js/raycastControl'
import Scene from '@/js/scene.js'
// import ModelManager from '@/js/modelManager.js'

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
    // this.init()
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
    SoundPlayer,
    IconButton,
    ModelLoader
  }{{/router}}
}
</script>

<style>
#app {
  font-family: "PingFang-SC-Regular", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #424242;
  background: #d4e0e0 url(assets/images/bg1@2x.jpg) 50% / cover no-repeat;
  width: 100vw;
  height: 100vh;
}
</style>
