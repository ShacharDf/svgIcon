<template>
  <div id="app">
    <svg-icon icon="eye" title="The eye never lie" />
    <svg-icon icon="map2" title="Search the thing you lost" />
    <svg-icon icon="wink2" />
  </div>
</template>

<script>
import svgIcon from "./components/svgIcon.vue";

export default {
  name: "App",
  components: {
    svgIcon,
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
  margin-top: 60px;
}
</style>
