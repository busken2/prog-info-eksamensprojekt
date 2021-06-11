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

//import af moment som er en date formatter
import moment from 'moment'

const app = createApp(App)
app.use(router).mount('#app')

const base = axios.create({
    baseURL: "https://prog-eksamensprojekt-6f9py.ondigitalocean.app/api", 
    timeout: 10000,
    headers: { 'Cache-Control' : 'no-cache'},
  });


app.config.globalProperties.$axios = base;


app.mixin({
  methods: {
    numberFormatter(num){
      var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(2).replace(rx, "$1") + si[i].symbol;
    },
    dateFormatter(date, format){
      return moment(date).format(format)
    }
  }
})
