<template>
  <div id="app">
    <svg-icon
      icon="eye"
      classList="blue-eye"
      title="The eye never lie"
      fileName="svgs"
    />
    <svg-icon icon="map2" title="Search the thing you lost" fileName="svgs" />
    <svg-icon icon="wink2" fileName="svgs" />
    <svg-icon icon="arrow-down" fileName="grey" />
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

.blue-eye {
  fill: rgb(46, 46, 192);
  stroke: black;
}
</style>
