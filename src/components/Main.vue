<template>
  <div class="container">
    <div class="cards row">
      <div class="col">
        <Card @balanceModal = "balanceModal" title="Balance" content="500" :button = true />
      </div>
      <div class="col">
        <Card @spendingsModal = "spendingsModal" title="Spendings" content="H3" :button = true />
      </div>
      <div class="col">
        <Card @avgModal = "avgModal" title="Average Spendings" content="H3" :button = false />
      </div>
    </div>
    <div class="charts row">
      <div class="col">
        <Chart type="line"/>
      </div>
      <div class="col">
        <Chart type="line"/>
      </div>
    </div>
    <div class="wallets row">
      <div class="col">
        <WalletList />
      </div>
    </div>
     


  </div>
</template>

<script>
 import { ref } from "vue"
import Card from "./Card.vue";
import Modal from './Modal'
import Chart from "./Chart.vue";
import WalletList from "./WalletList.vue";

export default {
 
  components: {
    Card,
    Chart,
    WalletList,
    Modal
  },

  setup(props,context){
 

 const balanceModal = () =>{
context.emit("balanceModal")
    }

    const spendingsModal = () =>{
context.emit("spendingsModal")
    }

    const avgModal = () =>{
context.emit("avgModal")
    }

 

    return {balanceModal,spendingsModal,avgModal}
  }
};
</script>

<style scoped>

body{
   text-align: left;
}
</style>