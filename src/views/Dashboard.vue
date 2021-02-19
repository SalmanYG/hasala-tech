<template>
  <div class="dashboard">
      <Sidebar @signout = "redirect" uname="salman"/>
      <Main/>
  </div>
</template>

<script>
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import {useRouter} from "vue-router"
export default {
    components: {
        Main,
        Sidebar
    },
    setup() {
        const router = useRouter()
const redirect = () =>{
 router.push("/")   
}

return {redirect}
    }
}
</script>

<style>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
}
</style>