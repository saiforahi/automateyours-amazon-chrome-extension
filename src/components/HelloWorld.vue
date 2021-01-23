<template>
  <div id="dashboard_component">
    <h5 class="display-4 text-center">{{ defaultText }}</h5>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  mounted () {
    browser.runtime.sendMessage({})
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  }
}
</script>

<style scoped>

</style>
