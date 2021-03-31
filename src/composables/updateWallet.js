import { ref } from "vue";
import { firestore, increment, arrUnion, auth} from "../firebase/config";
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

  const editWallet = async (data) => {
    const walletRef = firestore.collection("wallets").doc(wid)

    walletRef.update({
      name: data.name,
      balance: data.balance
    })

    for await (uid of data.users) {
      const userRef = firestore.collection("users").doc(uid)

      walletRef.update({
        users: arrUnion(uid)
      })

      userRef.update({
        wallets: arrUnion(wid)
      })
    }
  }

  const deleteWallet = async () => {
    const userRef = firestore.collection("users").doc(uid.value);

    userRef.update({
      wallets: firebase.firestore.FieldValue.arrayRemove(wid),
    });

    //query for users with the same wallet and delete it from their wallets array

    //delete wallet document
    const walletRef = firestore.collection("wallets").doc(wid);
    walletRef.delete(); 
  };

  return { updateBalance, updateSpendings, editWallet, deleteWallet };
};

export default updateWallet;
