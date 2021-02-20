import { ref } from 'vue'
import { firestore } from '../firebase/config'



const addToCollection = (collection) => {

  let error = ref(null)

  const addToDoc = async (doc) => {
    error.value = null

    try {
      await firestore.collection(collection).add(doc)
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
    }
  }

  return { error, addToDoc }

}

export default addToCollection