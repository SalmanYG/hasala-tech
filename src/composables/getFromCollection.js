import { ref } from 'vue'
import { firestore } from '../firebase/config'



const getFromCollection = (collection) => {

  let error = ref({})
  let doc = ref({})
  let docs = ref([])

  //method to get a single document
  const getDoc = async (id) => {
    

    try {
      firestore.collection(collection).doc(id).onSnapshot((snap) => {
        doc.value = { ...snap.data(), id: snap.id }
      })
      
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }

  //method to get the whole collection
  const getDocs = async () => {
    

    try {
      firestore.collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
              let documents = snap.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
              })
              docs.value = documents
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