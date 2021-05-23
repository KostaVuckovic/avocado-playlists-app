<template>
  <div class="user-playlists">
    <h3>My Playlists</h3>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a new playlist</router-link>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import getUser from '../composables/getUser'
import ListView from '../components/ListView'

export default {
  components: {
    ListView
  },
  setup(){
    const { user } = getUser()
    const { documents: playlists } = getCollection(
      'playlists',
      ['userId', '==', user.value.uid]
    )

    return {
      playlists
    }
  }
}
</script>

<style>

</style>