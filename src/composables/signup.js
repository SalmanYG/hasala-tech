import { ref } from "vue";
import { auth, firestore, arrUnion } from "../firebase/config";
import addToCollection from "./addToCollection"
import docRef from "./docRef"

const error = ref(null)
const user = ref(null)
const wallet = ref(null)

const signup = async (email, password, displayName) => {
  error.value = null;
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("Could not complete signup");
    }
    await res.user.updateProfile({ displayName });

    //create new user
    let { addDoc } = addToCollection("users")
    let user = {
      email: email
    }
    //we have to use await, otherwise, uid will get a promise instead of a string
    let uid = await addDoc(user)

    //create new wallet
    addDoc = addToCollection("wallets").addDoc
    let wallet = {
      name: "default",
      balance: 0
    }
    let wid = await addDoc(wallet)

    //create a document reference for user and wallet
    let getRef = docRef("users").getRef
    //we use await here also to get the refrence point instead of a promise
    let userRef = await getRef(uid)

    getRef = docRef("wallets").getRef
    let walletRef = await getRef(wid)

    //add the wallet id to the user document and vice versa
    userRef.update({
      wallets: arrUnion(wid)
    })

    walletRef.update({
      users: arrUnion(uid)
    })


    return res
  } catch (err) {
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
