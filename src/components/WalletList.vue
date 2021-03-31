<template>
  <div class="list">
      <div class="card">
        <div @click="toggleList" class="card-header">
            <div class="heading" v-if="!showWallets">
                <div class="heading-text">
                    <h6>Wallets (Showing {{shownWallet.name}})</h6>
                    <small>Click to show wallets...</small>
                </div>
                
                <span class="material-icons">expand_more</span>
            </div>
            <div class="heading" v-else>
                <div class="heading-text">
                    <h6>Wallets (Showing {{shownWallet.name}})</h6>
                    <small>Click to hide wallets...</small>
                </div>
                <span class="material-icons">expand_less</span>
            </div>
            <div>
                <button @click.stop="addWalletModal" class="btn btn-outline-light" type="button">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg>            
                </button>
            </div>
        </div>
        <div v-if="showWallets" class="list-group list-group-flush">
            <div v-for="wallet in wallets" :key="wallet.id">
                <Wallet :wallet="wallet" @show="showWallet" @edit="editWallet"/>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Wallet from './Wallet'
export default {
    props: ['wallets', 'shownWallet'],
    components: {
        Wallet
    },
    setup(props,context) {
        const showWallets = ref(true)

        const toggleList = () => {
            showWallets.value = !showWallets.value
        }
        const addWalletModal = () =>{
            context.emit("addWalletModal")
        }

        const showWallet = (wallet) =>{
             
            context.emit("show", wallet)
        }

        const editWallet = (wallet) => {
            context.emit("edit", wallet)
        }

        return { addWalletModal, showWallet, editWallet, showWallets, toggleList }
    }
};
</script>

<style scoped>
.list-group-item {
    cursor: pointer;
    padding-bottom: 0;
}

.list-group {
    max-height: 167px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

button{
  position: absolute;
  right: 3rem;
  top: 0.8rem;
  border-color: white;
}

button:hover .bi {
    fill: #048db6;
    transition: 0.35s;
}

.bi {
    transition: 0.35s;
    margin-bottom: 3px;
}

.card-header {
    cursor: pointer;
    background-color: #048db6;
    color: white;
    padding-top: 5px;
}

.card-header h6::selection,
.card-header span::selection,
.card-header small::selection{
    color: none;
    background: none;
}

.heading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.heading-text {
    max-width: 80%;
}

h6 {
    margin-bottom: 1px;
}
span {
    position: relative;
    top: 17px;
}

</style>