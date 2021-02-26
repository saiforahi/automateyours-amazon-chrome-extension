<template>
    <div class="container">
        <div class="row">
            {{order.ship_state}}
            {{ order.customerEmailId?order.customerEmailId:'' }}
        </div>
        <hr/>
        <div class="row" v-for="(line) in lines" :key="line.id" :value="line.id">
            <p>{{line.productName?line.productName:''}}</p>
        </div>
        <hr/>
        <div class="row">
            {{card}}
        </div>
    </div>
</template>
<script>
export default {
    name:'Order',
    data(){
        return{
            order:{},
            lines:[],
            card:{}
        }
    },
    mounted(){
        chrome.runtime.sendMessage({message: "get_order_details"}, (response) => {
            this.lines=response.lines;
            this.order=response.order;
            console.log(response.card)
            this.card=response.card;
        });
    }
}
</script>