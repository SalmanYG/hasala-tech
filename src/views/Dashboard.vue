<template>
  <div class="dashboard">
      <Sidebar @signout = "redirect" />
      <Main/>
      <div v-if="showModal">
   <Modal  />
      </div>

      <button @click = "toggleModal" >d</button>
 
  </div>
</template>

<script>
import { ref } from "vue";

import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import Modal from "../components/Modal"
import {useRouter} from "vue-router"
export default {
    components: {
        Main,
        Sidebar,
        Modal
    },
    setup() {
        const showModal = ref(false)
       
        
        const router = useRouter()
const redirect = () =>{
 router.push("/")   
}

const toggleModal = () =>{
 showModal.value = !showModal.value  
  console.log(showModal.value);
}

 console.log(showModal.value);
return {toggleModal,showModal,redirect}
    }
}
</script>

<style>
/* .dashboard {
    display: grid;
    grid-template-columns: 1fr 3fr;
} */
</style>