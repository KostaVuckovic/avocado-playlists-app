import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const pending = ref(false)

  let docRef = projectFirestore.collection(collection).doc(id)

  const deleteDoc = async () => {
    pending.value = true
    error.value = null
    try {
      const res = await docRef.delete()
      pending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      pending.value = false
      error.value = 'could not delete the document'
    }
  }

  const updateDoc = async (updates) => {
    pending.value = true
    error.value = null
    try {
      const res = await docRef.update(updates)
      pending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      pending.value = false
      error.value = 'could not update the document'
    }
  }

  return {
    error,
    pending,
    deleteDoc,
    updateDoc
  }
}

export default useDocument