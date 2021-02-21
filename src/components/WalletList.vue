<template>
  <div class="list">
      <div class="card">
          <div class="card-header">
              Wallets
               <button @click="toggleModal" class="btn btn-outline-primary" type="button">
            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>            
        </button>
          </div>
            <div class="list-group list-group-flush">
                <div v-for="wallet in wallets" :key="wallet.id">
                    <div class="list-group-item">
                        <h4>{{ wallet.name }}</h4>
                        <p>{{ wallet.balance }}SR</p>
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props: ['wallets'],
    setup(props,context) {

        const toggleModal = () =>{
            context.emit("walletModal")
        }

        return { toggleModal }
    }
};
</script>

<style scoped>
.list-group-item {
    cursor: pointer;
    padding-bottom: 0;
}

button{
   

  position: absolute;
  right: 10px;
  top: 1px;
 
}

</style>