/** 模型加载组件
 *@author Reson_a
 *@date 2018.5.24
 */

<template>
<div v-if="isRendered" class="model-loader loading-mask">
  <div class="loading">
    <div class="loading-animate">
        <div class="swapping-squares-spinner" style="">
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
        </div>
    </div>
    <div class="loading-text">
        <a>loading...</a>
        <a class="loading-text-percent">{{progress}}%</a>
    </div>
    <div class="loading-progress">
        <div class="loading-progress-current" :style="{width:`${progress}%`}"></div>
    </div>
    <div class="loading-tip">{{tip}}</div>
  </div>
</div>
</template>
<script>
// import Vue from 'vue'
import ModelManager from '@/js/modelManager'

export default {
  name: 'ModelLoader',
  props: {

  },
  data () {
    return {
      tip: '正在加载',
      progress: 0,
      isRendered: true
    }
  },
  async created () {
    let manager = this.manager = new ModelManager()
    manager.onProgress = (event, config) => {
      let { total, loaded } = event
      this.progress = Math.round(loaded / total * 100) || 0
      this.tip = `正在加载${config.tip}`
    }
    let res = await manager.loadAll()
    if (res.length) {
      this.tip = '场景初始化'
      this.$emit('loading-completed')
      this.$nextTick(() => {
        this.isRendered = false
      })
      // setTimeout(() => {
      //   this.isRendered = false
      // }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  z-index: 101;
  text-align: center;
}

/*动效*/

.loading-animate {
  display: inline-block;
  text-align: center;
}

.swapping-squares-spinner,
.swapping-squares-spinner * {
  box-sizing: border-box;
}

.swapping-squares-spinner {
  height: 65px;
  width: 65px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.swapping-squares-spinner .square {
  height: calc(65px * 0.25 / 1.3);
  width: calc(65px * 0.25 / 1.3);
  animation-duration: 1000ms;
  border: calc(65px * 0.04 / 1.3) solid #ffffff;
  margin-right: auto;
  margin-left: auto;
  position: absolute;
  animation-iteration-count: infinite;
}

.swapping-squares-spinner .square:nth-child(1) {
  animation-name: swapping-squares-animation-child-1;
  animation-delay: 500ms;
}

.swapping-squares-spinner .square:nth-child(2) {
  animation-name: swapping-squares-animation-child-2;
  animation-delay: 0ms;
}

.swapping-squares-spinner .square:nth-child(3) {
  animation-name: swapping-squares-animation-child-3;
  animation-delay: 500ms;
}

.swapping-squares-spinner .square:nth-child(4) {
  animation-name: swapping-squares-animation-child-4;
  animation-delay: 0ms;
}

@keyframes swapping-squares-animation-child-1 {
  50% {
    transform: translate(150%, 150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-2 {
  50% {
    transform: translate(-150%, 150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-3 {
  50% {
    transform: translate(-150%, -150%) scale(2, 2);
  }
}

@keyframes swapping-squares-animation-child-4 {
  50% {
    transform: translate(150%, -150%) scale(2, 2);
  }
}

/*进度文字*/

.loading-text {
  font-size: 20px;
}

/*进度条*/

.loading-progress {
  margin-top: 18px;
  width: 400px;
  height: 2px;
  margin-left: auto;
  margin-right: auto;
  background-color: #bdbdbd;
}

.loading-progress-current {
  width: 1%;
  height: 100%;
  background-color: #f5a623;
}

.loading-stats {
  margin-top: 14px;
}

/*警告信息*/

.loading-tip {
  width: 600px;
  margin-top: 20px;
  text-align: center;
}

/*确认按钮*/

.loading-confirmBtn {
  display: inline-block;
  width: 74px;
  height: 28px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  font-size: 14px;
  margin-top: 16px;
  line-height: 28px;
  cursor: pointer;
}
</style>
