import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

// refs
const error = ref(null)
const pending = ref(false)

// logout function
const logout = async () => {
  error.value = null
  pending.value = true

  try {
    await projectAuth.signOut()
    pending.value = false
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    pending.value = false
  }
}

const useLogout = () => {
  return { error, logout, pending }
}

export default useLogout