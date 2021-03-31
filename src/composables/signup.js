import { ref } from "vue"
import { auth, arrUnion, timeStamp } from "../firebase/config"
import addToCollection from "./addToCollection"
import docRef from "./docRef"

const error = ref(null)

const signup = async (email, password, displayName) => {
  error.value = null
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    if (!res) {
      throw new Error("Could not complete signup")
    }
    await res.user.updateProfile({ displayName })
    
    let uid = res.user.uid

    //create new user
    let { addDoc } = addToCollection("users")
    let user = {
      email: email,
      createdAt: timeStamp()
    };
    //we have to use await, otherwise, uid will get a promise instead of a string
    await addDoc(user, uid)

    //create new wallet
    addDoc = addToCollection("wallets").addDoc
    let wallet = {
      name: "Default",
      balance: 0,
      createdAt: timeStamp(),
      users: [
        uid
      ]
    }
    let wid = await addDoc(wallet)

    
    //create a document reference for user to add the wallet id to it
    const { getRef, result } = docRef("users")

    //we use await here also to get the refrence point instead of a promise
    await getRef(uid)

    //add the wallet id to the user document and vice versa
    result.value.update({
      wallets: arrUnion(wid)
    })

    return res;
  } catch (err) {
    error.value = err.message
  }
};

const useSignup = () => {
  return { error, signup }
};

export default useSignup
