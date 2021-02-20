<template>

<div v-if="button===true">
  <div class="card">
    <div class="card-body row">
      <div class="col-8">
        <h5 class="card-title">{{ title }}</h5>
        <h4 class="card-text">{{ content }}SR</h4>
      </div>
      <div  class="add col-4">
        <button @click="toggleModal" class="btn btn-outline-primary" type="button">
            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>            
        </button>
      </div>
    </div>
  </div>
</div>

<div v-else>
  <div class="card">
    <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <div class="inline">
            <h4 class="card-text">{{ content }}SR</h4>
            <p>per month</p>
        </div>
    </div>
  </div>
</div>

</template>

<script>
export default {
  props: ["title", "content", "button"],
  setup(props,context) {


    const toggleModal = () =>{


      if(props.title === "Balance"){

context.emit("balanceModal")

      }

      else if(props.title === "Spendings"){
context.emit("spendingsModal")
      }


      else if(props.title === "Average Spendings"){
context.emit("avgModal")
      }


    }
    return {toggleModal}
  },
};
</script>

<style scoped>
.card {
  border-left: 4px solid lightblue;
  margin: 25px 0;
}
.card-body {
  text-align: left;
  width: 100%;
}
.add {
  padding: 0;
}
.add button {
  margin: 15px 50% 0;
}
.inline * {
    display: inline-block;
}
.inline p {
    margin: 0 0 0 5px;
}
.inline h4 {
    margin: 0;
}
</style>