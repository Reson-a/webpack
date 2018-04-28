<template functional>
  <img id="logo" :src="props.logo"/>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    logo: {
      type: String,
      default: require('../assets/images/logo.png')
    }
  }
}
</script>
<style>
#logo {
  position: absolute;
  width: calc(5% + 68px);
  top: 20px;
  right: 20px;
}
</style>
