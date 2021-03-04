import docRef from "./docRef"
import {firestore, increment} from "../firebase/config"
import firebase from "firebase/app";
import "firebase/firestore";


const updateWallet = (wid) =>{

    const updateBalance = async (val) =>{
        
        // const {getRef, result} = docRef("wallets")
        // await getRef(wid)

        const walletRef = firestore.collection("wallets").doc(wid)

        walletRef.update({
            balance: firebase.firestore.FieldValue.increment(val)
        })
    
    }
return {updateBalance}
}


export default updateWallet