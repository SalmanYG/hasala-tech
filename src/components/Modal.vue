<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Add Balance</h5>
      <form>
        <div class="form-group">
          <input v-model="amount" type="number" class="form-control" />
        </div>
        <button @click.prevent="addAmount" type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const amount = ref(0);

    const closeModal = () => {
      context.emit("close");
    };

    const addAmount = () => {
      /*
firebaseSomething.add(amount.value)
*/
    };

    return { closeModal, amount, addAmount };
  }
};
</script>

<style>
button {
  margin-top: 5%;
}
</style>