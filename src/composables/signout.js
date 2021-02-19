import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);

const signOut = async () => {
  error.value = null;
  try {
    await auth.signOut();

    error.value = null;
  } catch (err) {
    console.log(error.value);

    error.value = err.message;
  }
};

const useSignout = () => {
  return { error, signOut };
};

export default useSignout;
