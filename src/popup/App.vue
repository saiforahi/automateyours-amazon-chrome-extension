<template>
  <div>
    <hello-world @clear="clear_logout" v-show="isLogged"></hello-world>
    <Login v-show="isLogged===false" @changed_status="change_auth_status"></Login>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login.vue'
export default {
  name: 'App',
  components: { HelloWorld, Login},
  data(){
    return{
      isLogged:false,
    }
  },
  computed:{
    // show_dashboard(){
    //   return this.$store.state.loggedIn
    // },
  },
  methods:{
    change_auth_status:function(){
      this.isLogged=true;
    },
    clear_logout(){
      this.isLogged=false;
    }
  },
  mounted(){
    chrome.runtime.sendMessage({message: "api_token"}, (response) => {
      if(response.api_token!==undefined){
        this.isLogged=true;
      }
    })
    // chrome.storage.local.get(['api_token'], function(result) {
    //     console.log(result);
    //     if(result.api_token){
    //       document.getElementById('dashboard_component').style.display='block'
    //       document.getElementById('login_component').style.display='none';
    //     }
    //     else{
    //       document.getElementById('login_component').style.display='block';
    //       document.getElementById('dashboard_component').style.display='none'
    //     }
    // });
  }
}
</script>

<style>
html {
  width: 300px;
  height: 300px;
  max-height: 400px;
}
</style>
