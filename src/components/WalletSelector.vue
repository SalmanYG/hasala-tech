<template>
  <form @submit.prevent="">
    <div class="row selector">
        <h6 class="">Current Wallet</h6>
        <div class="col-md-8">
            <select class="form-control full-width" v-model="walletOption">
                <option default value="">choose a wallet</option>
                <option v-for="wallet in wallets" :key="wallet" :value="wallet">{{wallet}}</option>
            </select>
        </div>
        <div class="form-group col-md-4">
            <button class="btn btn-primary full-width">h3</button>
        </div>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
    // props: ['wallets'],
    //bring wallets from the main component, then make the default wallet the default option
    //after that list all the other wallets as options, then when ever a wallet is chosen,
    //the pass the chosen wallet id back to the main component to display it

    setup(props, context){
        const walletOption = ref("")
        const wallets = ref([])
        wallets.value = ['111', '222', '333']

        return {walletOption, wallets}
    }
}
</script>

<style scoped>
.selector {
    margin-top: 20px;
}

.full-width {
    width: 100%;
}

@media (max-width: 768px) {

}
</style>>