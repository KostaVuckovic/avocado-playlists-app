<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{error}}</div>
    <button v-if="!pending">Sign up</button>
    <button v-if="pending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const router = useRouter()

    const { error, pending, signup } = useSignup()

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)
      if(!error.value){
        router.push({ name: 'UserPlaylists' })
      }
    }

    return {
      email,
      password,
      displayName,
      error,
      pending,
      handleSubmit
    }
  }
}
</script>

<style>

</style>