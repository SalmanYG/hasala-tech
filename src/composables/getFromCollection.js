import { ref } from 'vue'
import { firestore } from '../firebase/config'



const getFromCollection = (collection) => {

  let error = ref(null)
  let doc = ref(null)

  const getDoc = async (id) => {
    error.value = null

    try {
      let res = await firestore.collection(collection).doc(id).get()
      doc.value = { ...res.data(), id: res.id }
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }

  return { error, doc, getDoc }

}

export default getFromCollection