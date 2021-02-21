import { ref } from 'vue'
import { firestore } from '../firebase/config'



const getFromCollection = (collection) => {

  let error = ref({})
  let doc = ref({})
  let docs = ref([])

  //method to get a single document
  const getDoc = async (id) => {
    

    try {
      let res = await firestore.collection(collection).doc(id).get()
      doc.value = { ...res.data(), id: res.id }
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }

  //method to get the whole collection
  const getDocs = async () => {
    

    try {
      let res = await firestore.collection(collection)
      .orderBy('createdAt', 'desc')
      .get()
      docs.value = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }
  return { error, docs, doc, getDocs, getDoc }

}

export default getFromCollection