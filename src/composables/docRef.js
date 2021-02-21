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

  const getCollRef = async () => {
    error.value = null

    try {
      let res = await firestore.collection(collection)
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the collection'
    }
  }

  return { error, getRef, getCollRef }

}

export default docRef