// Vuejs core
import { createApp } from 'vue'
import App from './App.vue'

// Vuejs Router
import router from './router'

// Vuejs Axios
import axios from 'axios'
// import VueAxios from 'vue-axios'


// Vuex stat management
// import store from "./vuex"

/* Tailwindcss */
import './assets/style/tailwind.css'


const app = createApp(App)
app.use(router).mount('#app')

const base = axios.create({
    baseURL: "http://127.0.0.1:8000/api", 
    timeout: 1000,
    headers: { 'Cache-Control' : 'no-cache'},
  });


app.config.globalProperties.$axios = base;

