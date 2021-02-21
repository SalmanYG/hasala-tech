import { ref } from 'vue'
import { firestore } from '../firebase/config'



const docRef = (collection) => {

  let error = ref(null)

  const getRef = async (id) => {
    error.value = null

    try {
      let res = await firestore.collection(collection).doc(id)
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }

  return { error, getRef }

}

export default docRef