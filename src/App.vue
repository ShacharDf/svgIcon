<template>
  <div id="app">
    <svg-icon
      icon="eye"
      classList="blue-svg"
      title="The eye never lie"
      fileName="svgs"
    />
    <svg-icon icon="map2" title="Search the thing you lost" fileName="svgs" />
    <svg-icon icon="wink2" fileName="svgs" />
    <svg-icon icon="arrow-down" fileName="grey" />
    <svg-icon icon="pie-chart" fileName="black" classList="blue-svg" />
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

.blue-svg {
  fill: rgb(32, 32, 136);
  stroke: black;
}
</style>
