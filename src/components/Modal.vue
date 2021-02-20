<template>
  <div v-if=" title==='balance' ">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Balance</h5>

          <form @submit.prevent="addBalance">
            <div class="form-group">
              <label>Amount (SR)</label>
              <input v-model = "amount"  class="form-control" type="number" />
            </div>
            <button class="btn btn-primary">Add balance</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if=" title==='spendings' ">
    <div class="backdrop" @click.self="closeModal">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <button @click="closeModal" type="button" class="close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="card-title">Add Spending</h5>

          <form @submit.prevent="addSpending">
            <div class="form-group">
              <label>Amount (SR)</label>
              <input v-model = "amount" class="form-control" type="number" />
            </div>
            <button class="btn btn-primary">Add spending</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["title"],
  setup(props, context) {
    console.log(props.title === "balance");

    const amount = ref(0);
    const closeModal = () => {
      context.emit("close");
    };

    const addBalance = () => {
      /*
firebaseSomething.add(amount.value)
*/
    };

    const addSpending = () => {
      /*
firebaseSomething.add(amount.value)
*/
    };

    return { closeModal, amount, addBalance, addSpending };
  }
};
</script>

<style scoped>
button {
  margin-top: 5%;
}
.close {
  margin-top: 0%;
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.card {
  margin: auto;
  width: 50%;
  top: 30%;
}
</style>