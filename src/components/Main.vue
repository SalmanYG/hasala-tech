<template>
  <div class="container">
    <div class="cards row">
      <div class="col">
        <Card @balanceModal = "balanceModal" title="Balance" content="500" :button = true />
      </div>
      <div class="col">
        <Card @spendingsModal = "spendingsModal" title="Spendings" content="120" :button = true />
      </div>
      <div class="col">
        <Card @avgModal = "avgModal" title="Average Spendings" content="50" :button = false />
      </div>
    </div>
    <div class="charts row">
      <div class="col-6">
        <LineChart/>
      </div>
      <div class="col-6">
        <PieChart/>
      </div>
    </div>
    <div class="wallets row">
      <div class="col">
        <WalletList />
      </div>
    </div>
     


  </div>
  <div class="overlay"></div>
</template>

<script>
 import { ref } from "vue"
import Card from "./Card.vue";
import PieChart from "./PieChart.vue";
import LineChart from "./LineChart.vue";
import WalletList from "./WalletList.vue";

export default {
 
  components: {
    Card,
    PieChart,
    LineChart,
    WalletList
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