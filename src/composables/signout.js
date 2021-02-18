import {ref} from 'vue'
import { auth } from '../firebase/config'

 
const error = ref(null)


const signOut = async () =>{
error.value = null
try {
    const res = await auth.signOut()

    
    error.value = null
    return res
   
} catch (err) {
    error.value = err.message
}

}

const useSignout = () =>{

return {error, signOut}

}

export default useSignout