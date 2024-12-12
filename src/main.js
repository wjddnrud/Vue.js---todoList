import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// <bootstrapVue3> import
import { BootstrapVue3 } from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// <jquery> import
import $ from 'jquery'

// <jqgrid> import
import 'jqGrid/js/i18n/grid.locale-kr.js'
// 그리드 핸들링 관련 모듈 2개 필수 (드래그 및 에디트 등...)
import 'jquery-ui/dist/jquery-ui.js'
import 'jqGrid/js/jquery.jqGrid.min.js'

// <fontawesome> import
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

window.$ = $;
window.jQuery = $;

// <pinia> import
import { createPinia } from 'pinia';
const pinia = createPinia()



const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(BootstrapVue3);
app.use(pinia);

app.mount('#app');