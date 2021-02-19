import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref(null);

const login = async (email, password) => {
  error.value = null;
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);

    error.value = null;
    return res;
  } catch (err) {
    error.value = err.message;
  }
};

const useLogin = () => {
  return { error, login };
};

export default useLogin;
