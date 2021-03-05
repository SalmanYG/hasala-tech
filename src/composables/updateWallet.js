import docRef from "./docRef"
import { firestore, increment, arrUnion, timeStamp } from "../firebase/config"
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

    const updateSpendings = async (amount, category) =>{

        const walletRef = firestore.collection("wallets").doc(wid)
        walletRef.update({
            spendings: arrUnion({
                amount: amount,
                category: category,
                createdAt: firebase.firestore.Timestamp.now()
            })
        })
    
    }
return {updateBalance, updateSpendings}
}


export default updateWallet