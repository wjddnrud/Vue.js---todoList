<template>
  <!-- <nav>
    <router-link to="/todoList">list</router-link> |
    <router-link to="/todoList/saveForm">form</router-link> |
  </nav> -->
  <AppHeader></AppHeader>
  <router-view/>
</template>

<script>
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
</style>
