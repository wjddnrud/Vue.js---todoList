<template>
  <!-- <div class="app-container">
    <router-view />
  </div> -->
  <nav>
    <router-link to="/list">TODOLIST /</router-link>
    <router-link to="/pmsGrid"> PMSGRID</router-link>
  </nav>
  <router-view />  
</template>

<script>
import "@/assets/css/content/jqGrid_mod.css"
import 'jqGrid/css/ui.jqgrid.css'


import '@/static/css/bootstrap.css'
import '@/static/css/style.css'
import '@/static/css/index.css'
import '@/static/css/web.css'

import "@/assets/css/common.css"
import "@/assets/css/content/common_content.css"


export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.app-container {
  max-width: 800px; /* 원하는 최대 폭을 설정 */
  margin: 0 auto; /* 양쪽 여백을 동일하게 */
  padding: 50px; /* 내부 여백 추가 */
  margin-top: 10%;
  background-color: #A9BCF5; /* 기존 배경 색상 유지 */
  border-radius: 30px; /* 둥근 모서리 */
}
</style>
