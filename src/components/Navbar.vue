<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/avocado.svg" alt="avocado-icon">
      <h1><router-link :to="{ name: 'Home' }">Avocado</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }">Create Playlist</router-link>
          <router-link :to="{ name: 'UserPlaylists' }">My Playlists</router-link>
          <span>{{user.displayName}}</span>
          <button @click="handleSubmit">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
          <router-link class="btn" :to="{ name: 'Signup' }">Signup</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const { error, logout, pending } = useLogout()
    const router = useRouter()

    //logout
    const handleSubmit = async () => {
      await logout()
      if(!error.value){
        console.log('user logout')
        router.push({ name: 'Login' })
      }
    }

    //get current user's status
    const { user } = getUser()
    

    return {
      pending,
      handleSubmit,
      user
    }
  }
}
</script>

<style scoped>
.navbar{
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}

nav{
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

nav h1{
  margin-left: 10px;
}

nav .links {
  margin-left: auto;
}

nav .links a, button{
  margin-left: 16px;
  font-size: 14px;
}

nav img{
  max-height: 50px;
}

span{
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid #eee;
  font-weight: 600;
}
</style>