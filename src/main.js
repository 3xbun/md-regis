import { createApp } from 'vue'
import router from './router';
import './style.css'
import App from './App.vue'


/* Set up using Vue 3 */

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHeart } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHeart)

createApp(App).use(router)
    .component('font-awesome-icon', FontAwesomeIcon).mount('#app')