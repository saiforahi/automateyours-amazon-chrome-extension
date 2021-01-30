<template>
  <div id="dashboard_component">
    <b-button v-on:click="clearAndLogout">Clear and logout</b-button>
    <Order/>
  </div>
</template>

<script>
import Order from './Order.vue'
export default {
  name: 'HelloWorld',
  components:{Order},
  data(){
    return{
      
    }
  },
  mounted () {
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  },
  methods:{
    clearAndLogout:function(){
      //chrome.storage.local.clear();
      //chrome.runtime.sendMessage()
      chrome.runtime.sendMessage({message: "clear_logout"})
      this.$emit('clear');
    }
  }
}
</script>

<style scoped>

</style>
