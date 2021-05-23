import { ref } from '@vue/reactivity'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    //create filepath in storage where to put files
    filePath.value = `covers/${user.value.uid}/${file.name}`
    // create reference by sending filepath to ref function
    const storageRef = projectStorage.ref(filePath.value)

    try {
      // sending file to storage
      const res = await storageRef.put(file)
      // getting download url for that file
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path)

    try {
      storageRef.delete()
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return {
    error,
    url,
    filePath,
    uploadImage,
    deleteImage
  }
}

export default useStorage