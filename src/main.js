import { createApp } from 'vue'
import App from './App.vue'
import router from './router'       // 설치한 라우터를 가져와서
// import moment from 'vue-moment'

import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// fontawesome import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)


const app = createApp(App);
app.use(router);        // 사용할 것이라고 선언. use(router) 추가                  
// app.use(moment);
app.use(BootstrapVue3);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

// import TodoList from './views/TodoList.vue'
// createApp(TodoList).mount('#app')

