import { ref } from 'vue'
import { firestore } from '../firebase/config'



const addToCollection = (collection) => {

  let error = ref(null)

  const addDoc = async (doc) => {
    error.value = null

    try {
      let res = await firestore.collection(collection).add(doc)
      return res.id
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
    }
  }

  return { error, addDoc }

}

export default addToCollection