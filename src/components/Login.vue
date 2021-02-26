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
                    <b-button v-show="login_btn_pressed===false" type="button" v-on:click="handle_login" variant="outline-dark">Login</b-button>
                    <div v-show="login_btn_pressed">
                        <b-spinner type="grow" label="Loading..."></b-spinner>
                    </div>
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
            error_message:"",
            login_btn_pressed:false
        }
    },
    mounted(){
        chrome.storage.local.get(['api_token'],function(response){
            console.log(response.api_token)
        })
    },
    methods:{
        handle_login:function(){
            this.login_btn_pressed=true;
            PUBLIC_API.post(API_URL+'/api/v1/authorize',JSON.stringify({username:this.username,password:this.password}),{headers: {"Access-Control-Allow-Origin": "*"}}).then(response=>{
                if(response.data.status===1){
                    console.log(response.data)
                    chrome.runtime.sendMessage({message:"set_api_token",api_token:response.data.data.authorization_code})
                    this.$emit('changed_status');
                }
            }).catch(error=>{
                this.error_credentials=true;
                this.login_btn_pressed=false;
                this.error_message=error.response.data.errors.password[0];
            })
        }
    }
}
</script>