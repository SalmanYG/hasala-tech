import { ref } from 'vue'
import { firestore } from '../firebase/config'



const docRef = (collection) => {

  let error = ref({})
  let result = ref({})
  let collResult = ref({})
  
  const getRef = async (id) => {

    try {
      result.value = firestore.collection(collection).doc(id)
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the document'
    }
  }

  const getCollRef = async () => {

    try {
      collResult.value =  firestore.collection(collection)
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not get the collection'
    }
  }

  return { error, getRef, getCollRef, result, collResult }

}

export default docRef