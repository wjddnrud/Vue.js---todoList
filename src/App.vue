<template>
  <div id="app" class="app-container">
    <AppHeader></AppHeader>
    <router-view />
  </div>
</template>

<script>
import "@/assets/css/content/jqGrid_mod.css"
import 'jqGrid/css/ui.jqgrid.css'
import AppHeader from '@/components/layout/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader
  }
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.app-container {
  max-width: 800px; /* 원하는 최대 폭을 설정 */
  margin: 0 auto; /* 양쪽 여백을 동일하게 */
  padding: 20px; /* 내부 여백 추가 */
  background-color: #A9BCF5; /* 기존 배경 색상 유지 */
  border-radius: 30px; /* 둥근 모서리 */
}
</style>
