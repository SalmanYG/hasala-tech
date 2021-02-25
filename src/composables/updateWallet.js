import docRef from "./docRef"
import {increment} from "../firebase/config"


const updateWallet = () =>{

    const updateBalance = async (wid,val) =>{
        
        const {getRef, result} = docRef("wallets")
        await getRef("ccBwTkNH76gEHmwm6r7i")
    
       
        result.value.update("balance",increment(val))
    
    }
return {updateBalance}
}


export default updateWallet