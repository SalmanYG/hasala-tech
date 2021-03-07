import docRef from "./docRef";
import { ref, onMounted } from "vue";
import {
  firestore,
  increment,
  arrUnion,
  auth,
  timeStamp,
} from "../firebase/config";
import firebase from "firebase/app";
import "firebase/firestore";

const user = ref(auth.currentUser);
let uid = ref({});
auth.onAuthStateChanged((newUser) => {
  if (newUser) {
    user.value = newUser;
    uid.value = user.value.uid;
  }
});

const updateWallet = (wid) => {
  const updateBalance = async (val) => {
    // const {getRef, result} = docRef("wallets")
    // await getRef(wid)

    const walletRef = firestore.collection("wallets").doc(wid);

    walletRef.update({
      balance: increment(val),
    });
  };

  const updateSpendings = async (amount, category) => {
    const walletRef = firestore.collection("wallets").doc(wid);
    walletRef.update({
      spendings: arrUnion({
        amount: amount,
        category: category,
        createdAt: firebase.firestore.Timestamp.now(),
      }),
    });
  };

  const deleteWallet = async () => {
    const userRef = firestore.collection("users").doc(uid.value);

    userRef.update({
      wallets: firebase.firestore.FieldValue.arrayRemove(wid),
    });

     const walletRef = firestore.collection("wallets").doc(wid);
    walletRef.delete(); 
  };

  return { updateBalance, updateSpendings, deleteWallet };
};

export default updateWallet;
