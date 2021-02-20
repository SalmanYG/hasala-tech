<template>
    <div class="container-fluid">
        <div class="cards row">
            <div class="col-4">
                <Card @toggleModal = "toggleModal" title="Balance" content="500" func="z" />
            </div>
            <div class="col-4">
                <Card @toggleModal = "toggleModal" title="salman" content="H3" func="h3" />
            </div>
            <div class="col-4">
                <Card @toggleModal = "toggleModal" title="salman" content="H3" func="h3" />
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

  setup(props,context) {
    const toggleModal = () => {
        context.emit("toggleModal")
    }

    const openSidebar = () => {
        console.log("side bar opened");
        context.emit("open")
    }

    return { toggleModal, openSidebar }
  }
};
</script>

<style scoped>
.overlay {
    display: none;
    position: fixed;
    /* full screen */
    width: 100vw;
    height: 100vh;
    /* transparent black */
    background: rgba(0, 0, 0, 0.7);
    /* middle layer, i.e. appears below the sidebar */
    z-index: 998;
    opacity: 0;
    /* animate the transition */
    transition: all 0.5s ease-in-out;
}

.overlay.active {
    display: block;
    opacity: 1;
}

/* DELETE LATER */
button {
    margin-left: 250px;
}
</style>