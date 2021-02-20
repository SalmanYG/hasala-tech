import { ref } from "vue";
import { auth } from "../firebase/config";
import addToCollection from "./addToCollection"

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.value = null;
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    if (!res) {
      throw new Error("Could not complete signup");
    }
    await res.user.updateProfile({ displayName });

    //create new user
    let { error, addDoc } = addToCollection("users")
    let user = {
      email: email,
    }
    let uid = addDoc(user)

    //create new wallet
    error = addToCollection("wallets").error
    addDoc = addToCollection("wallets").addDoc
    let wallet = {
      name: "default",
      balance: 0
    }
    let wid = addDoc(wallet)

    //add the wallet id to the user wallet


    
    return res;
  } catch (err) {
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
