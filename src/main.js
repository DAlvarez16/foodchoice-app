import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(fas)

const app = createApp(App)
app.use(router)
app.use(VueSweetalert2)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
