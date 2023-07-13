<template>
  <nav>
    <div>{{ title }}</div>
  </nav>
  <router-view />
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "App",
  setup(props, { slots, emit }) {
    onMounted(() => {});
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 1rem;
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
