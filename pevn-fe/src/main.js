import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// import axios from'axios'
// import VueAxios from 'vue-axios'

loadFonts()

// VueAxios.use(VueAxios, axios)

// axios.defaults.baseURL = 'http://localhost:3000'

createApp(App)
  .use(vuetify)
  .mount('#app')
