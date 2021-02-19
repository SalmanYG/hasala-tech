<template>
  <div class="dashboard">
      <Sidebar uname="salman"/>
  </div>
</template>

<script>
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'

export default {
    components: {
        Main,
        Sidebar
    },
    setup() {

    }
}
</script>

<style>
/* .dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
} */
</style>