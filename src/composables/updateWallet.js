import docRef from "./docRef"
import {increment} from "../firebase/config"


const updateWallet = (wid) =>{

    const updateBalance = async (val) =>{
        
        const {getRef, result} = docRef("wallets")
        await getRef(wid)
        result.value.update({
            balance: firebase.firestore.FieldValue.increment(val)
        })
    
    }
return {updateBalance}
}


export default updateWallet