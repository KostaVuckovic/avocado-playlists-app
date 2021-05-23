import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

// import main style
import './assets/main.css'

let app

projectAuth.onAuthStateChanged(() => {
  if(!app){
    app = createApp(App).use(router).mount('#app')
  }
})

