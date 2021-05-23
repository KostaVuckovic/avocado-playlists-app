import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const pending = ref(false)

const login = async (email, password) => {
  error.value = null
  pending.value = true

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    pending.value = false
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
    pending.value = false
  }
}

const useLogin = () => {
  return { error, login, pending }
}

export default useLogin