<template>
  <div class="container">
    <div class="cards row">
      <div class="col">
        <Card title="Balance" content="500" func="z" />
      </div>
      <div class="col">
        <Card title="salman" content="1200" func="h3" />
      </div>
      <div class="col">
        <Card title="salman" content="1000" func="h3" />
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
import Card from "./Card.vue";
import Chart from "./Chart.vue";
import WalletList from "./WalletList.vue";

export default {
  components: {
    Card,
    Chart,
    WalletList,
  },
};
</script>

<style scoped>
.cards.row {
}
</style>