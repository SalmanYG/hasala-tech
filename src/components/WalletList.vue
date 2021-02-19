<template>
  <div class="list">
      <div class="card">
          <h5 class="card-header">
              Month
          </h5>
            <div class="list-group list-group-flush">
                <div v-for="wallet in wallets" :key="wallet.id">
                    <div class="list-group-item">
                        <h2>{{ wallet.name }}</h2>
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
    setup() {
        const wallets = ref([])
        wallets.value = [
            {
                id: 1,
                name: "wallet1",
                balance: 500
            },
            {
                id: 2,
                name: "wallet2",
                balance: 4200
            },
            {
                id: 3,
                name: "wallet3",
                balance: 100
            }
        ]

        return { wallets }
    }
};
</script>

<style scoped>
.list-group-item {
    cursor: pointer;
}
</style>