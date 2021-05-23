<template>
  <div class="error" v-if="errorGet">{{errorGet}}</div>
  <div v-if="document" class="playlist-details">
    <!-- playlist info -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="document.coverUrl" alt="playlist-cover">
      </div>
      <h2>{{document.title}}</h2>
      <p class="username">Created by {{document.userName}}</p>
      <p class="description">{{document.description}}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
      <!-- <button v-if="pending" disabled>Loading</button> -->
    </div>
    <!-- song list -->
    <div class="song-list">
      <div v-if="!document.songs.length">No songs have been added yet.</div>
      <div v-for="song in document.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{song.title}}</h3>
          <p>{{song.artist}}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="document" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import useDocument from '../composables/useDocument'
import useStorage from '../composables/useStorage'
import AddSong from '../components/AddSong'

export default {
props: ['id'],
components: {
  AddSong
},
setup(props){
  const { error: errorGet, document } = getDocument('playlists', props.id)

  // check ownership of playlist for delete button
  const { user } = getUser()

  const ownership = computed(() => {
    return document.value && user.value && user.value.uid == document.value.userId
  })

  // delete document
  const { error: errorDelete, deleteDoc } = useDocument('playlists', props.id)
  const { deleteImage } = useStorage()
  const router = useRouter()

  const handleDelete = async () => {
    await deleteImage(document.value.filePath)
    await deleteDoc()
    
    if(!errorDelete.value){
      router.push({ name: 'Home' })
    }
  }

  // delete song
  const { updateDoc } = useDocument('playlists', props.id)
  const handleClick = async (id) => {
    const songs = document.value.songs.filter(song => song.id != id )
    
    await updateDoc({ songs })
  }

  return {
    errorGet,
    document,
    ownership,
    errorDelete,
    handleDelete,
    handleClick
  }
}
}
</script>

<style scoped>
.playlist-details{
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover{
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px
}

.cover img{
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}

.playlist-info{
  text-align: center;
}

.playlist-info h2{
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}

.playlist-info p{
  margin-bottom: 20px;
}

.username{
  color: #999;
}

.description{
  text-align: left;
}

.single-song{
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}

</style>