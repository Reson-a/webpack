/** 图标按钮组件
 *@author Reson_a
 *@date 2018.4.2
 */

<template>
  <div class="icon-button" :class="{'is-disabled':isDisabled,'is-selected':isSelected}" @mouseenter="isHintShow = true&&!isDisabled"  @mouseleave="isHintShow=false" @click="handleClick">
    <span :style="{background:`url(${isDisabled?iconDisabled:icon}) center center/45% no-repeat`}"></span>
    <hint-popover :hint="hint" :is-show="hasHint&&isHintShow"></hint-popover>
  </div>
</template>

<script>
import HintPopover from '@/components/HintPopover.vue'
export default {
  name: 'IconButton',
  props: {
    icon: {
      type: String
    },
    // 禁用状态图标
    iconDisabled: {
      type: String
    },
    hint: {
      type: String
    },
    // 是否有提示
    hasHint: {
      type: Boolean,
      default: true
    },
    // 是否被禁用
    isDisabled: {
      type: Boolean,
      default: false
    },
    // 是否被选中
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isHintShow: false
    }
  },
  methods: {
    handleClick (e) {
      if (this.isDisabled) return
      this.$emit('click', e)
    }
  },
  components: {
    HintPopover
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-button {
  position: relative;
  box-sizing: border-box;
  width: 60px;
  height: 50px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  background-image: linear-gradient(
    -180deg,
    #ffffff 3%,
    #f3f3f3 64%,
    #e6e5e5 97%
  );
  // border: 1px solid #979797;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #ffffff;
  }
  &:active {
    background: rgba(0, 0, 0, 0.3);
  }
  &.is-disabled {
    background: #e0e0e0;
    border: 1px solid #979797;
  }
  &.is-selected {
    background: #2196f3;
    border: 1px solid #006bc1;
  }
  span {
    display: block;
    height: 100%;
  }
}
</style>
