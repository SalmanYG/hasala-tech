import { ref } from "vue";
import { auth } from "../firebase/config";

const user = ref(auth.currentUser);





 auth.onAuthStateChanged(  (newUser) => {
   user.value = newUser;
}); 

const getUser = () => {
  return { user };
};

export default {getUser,user};
