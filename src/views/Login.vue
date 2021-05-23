<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{error}}</div>
    <button v-if="!pending">Login</button>
    <button v-if="pending" disabled>Loading</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
name: 'Login',
setup(){
  const router = useRouter()

  const { error, login, pending } = useLogin()

  const email = ref('')
  const password = ref('')

  const handleSubmit = async () => {
    const res = await login(email.value, password.value)
    if(!error.value){
      router.push({ name: 'UserPlaylists' })
    }
  }

  return {
    error,
    login,
    email,
    password,
    handleSubmit,
    pending
  }
}
}
</script>

<style>

</style>