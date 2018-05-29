/** 提示浮框组件
 *@author Reson_a
 *@date 2018.4.2
 */

<template functional>
  <div class="hint-popover" v-show="props.isShow">
    {{props.hint}}
  </div>
</template>

<script>
export default {
  name: 'HintPopover',
  props: {
    hint: {
      type: String
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hint-popover {
  position: absolute;
  top: 1px;
  left: 78px;
  box-sizing: border-box;
  // width: 70px;
  height: 48px;
  font-size: 18px;
  padding: 0 10px;
  color: #1976d2;
  letter-spacing: 0;
  white-space: nowrap;
  line-height: 48px;
  background: #e3f2fd;
  border: 1px solid #40a9ff;
  border-radius: 4.5px;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: -11px;
    top: 11px;
    border-top: 12px solid transparent;
    border-right: 11px solid #40a9ff;
    border-bottom: 12px solid transparent;
  }
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    left: -10px;
    top: 13px;
    border-top: 10px solid transparent;
    border-right: 10px solid #e3f2fd;
    border-bottom: 10px solid transparent;
  }
}
</style>
