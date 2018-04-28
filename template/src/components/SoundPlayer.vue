/** 声音播放组件
 *@author Reson_a
 *@date 2018.4.11
 */

<template functional>
  <div class="sound-player" style="display:none">
    <audio v-for="(sound,index) in props.sounds" :key="index" :id="`sound-${sound.name}`"
    :src="sound.src" preload></audio>
  </div>
</template>
<script>
import Vue from 'vue'

Vue.prototype.$playSound = function (name) {
  let audio = document.getElementById(`sound-${name}`)
  audio.currentTime = 0
  audio.volume = 0.4
  audio.play()
}

export default {
  name: 'SoundPlayer',
  props: {
    sounds: {
      type: Array
    }
  }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
