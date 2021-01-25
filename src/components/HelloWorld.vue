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
  mounted () {
        // browser.runtime.sendMessage({message: "clear_logout"}, (response) => {
        //     console.log(response)
        // })
  },
  computed: {
    defaultText () {
      return browser.i18n.getMessage('extName')
    }
  },
  methods:{
    clearAndLogout:function(){
      chrome.storage.local.clear();
      document.getElementById('dashboard_component').style.display="none"
      document.getElementById('login_component').style.display="block"
      //chrome.runtime.sendMessage()
    }
  }
}
</script>

<style scoped>

</style>
