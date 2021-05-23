<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description" v-model="description"></textarea>
    <!-- Upload image -->
    <label>Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>

    <button v-if="!pending">Create</button>
    <button v-else disabled>Saving...</button>

  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '../composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const title = ref('')
    const description = ref('')

    const { url, filePath, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const pending = ref(false)
    const router = useRouter()

    const handleSubmit = async () => {
      if(file.value){
        pending.value = true
        await uploadImage(file.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        })
        pending.value = false
        if(!error.value){
          router.push({ name: 'PlaylistDetails', params: { id: res.id}})
        }
      }
    }

    //allowed types
    const types = ['image/png', 'image/jpeg']

    //handle when user upload file
    const file = ref(null)
    const fileError = ref(null)

    const handleChange = (e) => {
      const selected = e.target.files[0]
      if(selected && types.includes(selected.type)){
        file.value = selected
        fileError.value = null
      }else{
        file.value = null
        fileError.value = 'Select an image file'
      }
    }

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      pending
    }
  }
}
</script>

<style>
input[type="file"]{
  border: 0;
  padding: 0;
}

label{
  font-size: 12px;
  margin-top: 30px;
  display: block;
}

button{
  margin-top: 20px;
}
</style>