<template>
  <div class="dashboard container">
      <div class="row">
            <div class="sidebar col-2">
                <Sidebar @signout = "redirect" uname="salman"/>
            </div>
            <div class="main col-10">
                <Main/>
            </div>
      </div>

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

<style scoped>
.dashboard {
    margin: 0;
}
</style>