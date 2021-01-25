<template>
    <div class="container" id="login_component">
        <div class="row">
            <div class="col">
                <h3 class="display-4 text-center">Sign in</h3>
                <hr>
                <p class="text-danger" v-if="error_credentials">{{error_message}}</p>
                <b-form>
                    <b-form-group>
                        <b-form-input v-model="username" type="email" placeholder="Enter email"/>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input v-model="password" type="password" placeholder="Enter password"/>
                    </b-form-group>
                    <b-button type="button" v-on:click="handle_login" variant="outline-dark">Login</b-button>
                </b-form>
            </div>
        </div>
    </div>
</template>
<script>
import {API_URL, PUBLIC_API} from '../config'
export default {
    name:"Login",
    data(){
        return{
            username:"",
            password:"",
            error_credentials:false,
            error_message:""
        }
    },
    mounted(){
        console.log("Login component mounted")
    },
    methods:{
        handle_login:function(){
            PUBLIC_API.post(API_URL+'/api/v1/authorize',JSON.stringify({username:this.username,password:this.password}),{headers: {"Access-Control-Allow-Origin": "*"}}).then(response=>{
                if(response.data.status===1){
                    chrome.storage.local.set({"api_token": response.data.data.authorization_code}, function() {
                        console.log(response.data.data.authorization_code)
                    });
                    this.$emit('changed_status',true);
                }
            }).catch(error=>{
                this.error_credentials=true;
                this.error_message=error.response.data.errors.password[0];
            })
            // chrome.storage.local.set({"api_token": "regrgrtgtht4t54t5"}, function() {
            //     console.log('Value is set to ');
            // });
            // this.$emit('changed_status',true);
        }
    }
}
</script>