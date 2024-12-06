import { createApp } from 'vue'
import App from './App.vue'
import router from './router'       // 설치한 라우터를 가져와서
// import moment from 'vue-moment'


const app = createApp(App);
app.use(router);        // 사용할 것이라고 선언. use(router) 추가                  
// app.use(moment);
app.mount('#app');

// import TodoList from './views/TodoList.vue'
// createApp(TodoList).mount('#app')

